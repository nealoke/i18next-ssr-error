import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import Link from "next/link";

class NavBar extends PureComponent {
	render() {
		const { t, router } = this.props;

		const currentLanguage = router.asPath.split("/")[1];
		const currentRoute = router.pathname;
		const routes = [""];

		return (
			<div>
				<div>
					<div>
						<Link href={`/nl${currentRoute}`}>
							<a>NL</a>
						</Link>

						<br />

						<Link href={`/en${currentRoute}`}>
							<a>EN</a>
						</Link>

						<br />

						<Link href={`/fr${currentRoute}`}>
							<a>FR</a>
						</Link>

						<br />
						<br />
					</div>
				</div>

				<div>
					{routes.map(route => (
						<Link href={`/${currentLanguage}/${route}`} key={route}>
							<a>
								{route || "home"}
								<br />
							</a>
						</Link>
					))}
				</div>

				<br />
				<br />
			</div>
		);
	}
}

export default withRouter(NavBar);
