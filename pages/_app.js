import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import Router from "next/router";
import withRedux from "next-redux-wrapper";

import { translation } from "./../localization/config";
import i18n from "./../localization/i18n";
import languagePathCorrection from "./../localization/helpers/languagePathCorrection";

import createStore from "./../state/store";

Router.events.on("routeChangeStart", (originalRoute) => {
	const correctedPath = languagePathCorrection(originalRoute);
	if (correctedPath !== originalRoute) {
		Router.replace(correctedPath, correctedPath, { shallow: true });
	}
});

i18n.on("languageChanged", (lng) => {
	if (process.browser) {
		const originalRoute = window.location.pathname;
		const correctedPath = languagePathCorrection(originalRoute, lng);
		if (correctedPath !== originalRoute) {
			Router.replace(correctedPath, correctedPath, { shallow: true });
		}
	}
});

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return {
			pageProps,
			initialLanguage: ctx.req.language ? ctx.req.language : translation.defaultLanguage
		};
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Container>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default withRedux(createStore)(MyApp);
