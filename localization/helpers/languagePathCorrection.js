import config from "./../config";
import i18n from "./../i18n";

const { languages } = config.translation;

export default (currentRoute, currentLanguage = i18n.languages[0]) => {
	if (!languages.includes(currentLanguage)) {
		return currentRoute;
	}

	let correctRoute = currentRoute;

	languages.some((lng) => {
		if (currentRoute.startsWith(`/${lng}/`)) {
			correctRoute = correctRoute.replace(`/${lng}/`, "/");
			return true;
		}

		return false;
	});

	return `/${currentLanguage}${correctRoute}`;
};
