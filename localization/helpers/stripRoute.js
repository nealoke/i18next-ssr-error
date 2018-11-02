const { translation } = require("./../config");

/**
 * Remove language from route
 * @param {Object} url req.url
 * @returns {String} URL without language prefix
 */
function stripRoute(url) {
	let strippedRoute = url;

	translation.languages.some((lng) => {
		if (url.startsWith(`/${lng}/`)) {
			strippedRoute = strippedRoute.replace(`/${lng}/`, "/");
			return true;
		}

		return false;
	});

	return strippedRoute;
}

module.exports = stripRoute;
