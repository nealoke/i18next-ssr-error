import React from "react";
import Head from "next/head";

import NavBar from "../components/NavBar";

export default ({ children }) => (
	<div>
		<Head>
			<title key="title">Default title</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>

		<NavBar />
		<div className="CONTENT">{children}</div>
	</div>
);
