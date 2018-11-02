import React, { PureComponent } from "react";

import { withI18next } from "./../localization/helpers/withI18next";

import Layout from "./../layouts";

class Home extends PureComponent {
	static async getInitialProps() {
		const timeout = ms => new Promise(res => setTimeout(res, ms));
		await timeout(1000);
		return { content: "page prop via getInitialProps" };
	}

	render() {
		const { t, content } = this.props;

		return (
			<Layout>
				<div>{t("common:navigation.home")}</div> {/* This works fine */}
			</Layout>
		);
	}
}

export default withI18next(["common", "home"])(Home);
