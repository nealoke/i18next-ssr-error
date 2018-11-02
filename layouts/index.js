import React from "react";
import Head from "next/head";

import { withI18next } from "./../localization/helpers/withI18next";

import NavBar from "../components/NavBar";

const Layout = ({ children }) => (
	<div>
		<Head>
			<title key="title">Default title</title>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>

		<NavBar />
		<div className="CONTENT">{children}</div>
	</div>
);

export default withI18next(["common"])(Layout);
