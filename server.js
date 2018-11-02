const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const next = require("next");
const parseURL = require("url").parse;
const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");

const config = require("./localization/config");
const i18n = require("./localization/i18n");
const getAllNamespaces = require("./localization/helpers/getAllNamespaces");
const stripRoute = require("./localization/helpers/stripRoute");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { languages, defaultLanguage } = config.translation;

const serverSideOptions = {
	fallbackLng: defaultLanguage,
	ns: getAllNamespaces(
		path.join(__dirname, `/static/locales/${defaultLanguage}/`)
	),
	backend: {
		loadPath: path.join(__dirname, "/static/locales/{{lng}}/{{ns}}.json"),
		addPath: path.join(
			__dirname,
			"/static/locales/{{lng}}/{{ns}}.missing.json"
		)
	},
	detection: {
		order: ["path", "session", "querystring", "cookie", "header"], // all
		caches: ["cookie"], // default false
		lookupPath: "lng",
		lookupFromPathIndex: 0
	},
	preload: languages,
	whitelist: languages
};

i18n.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init(serverSideOptions, () => {
		app.prepare().then(() => {
			const server = express();

			server.use(i18nextMiddleware.handle(i18n));
			server.use(
				"/locales",
				express.static(path.join(__dirname, "/locales/"))
			);
			server.use(bodyParser.json());

			/*= =======================================
			=            URL manipulation            =
			========================================= */
			// Force initial language
			server.get("/", (req, res, cb) => {
				const { pathname } = parseURL(req.url);
				res.redirect(301, `/nl${pathname}`);
				cb();
			});

			// Force trailing slash on language sub paths
			server.get("*", (req, res, cb) => {
				const { pathname, search } = parseURL(req.url);

				languages.forEach(lng => {
					if (
						pathname.startsWith(`/${lng}`) &&
						!pathname.startsWith(`/${lng}/`)
					) {
						res.redirect(
							302,
							pathname.replace(`/${lng}`, `/${lng}/`) + search ||
								""
						);
					}
				});

				cb();
			});

			/*= ==============================
			=            Routing            =
			================================ */
			// Return assets
			server.get("*", (req, res, cb) => {
				if (req.url === stripRoute(req.url)) {
					handle(req, res);
				} else {
					cb();
				}
			});

			server.get("*", (req, res) => {
				app.render(req, res, stripRoute(req.url));
			});

			server.listen(3000, err => {
				if (err) throw err;
				console.log("> Ready on http://localhost:3000");
			});
		});
	});
