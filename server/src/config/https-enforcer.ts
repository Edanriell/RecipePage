import helmet from "helmet";

const httpsConfig = helmet.hsts({
	maxAge: 86400,
	includeSubDomains: true,
	preload: true
});

export { httpsConfig };
