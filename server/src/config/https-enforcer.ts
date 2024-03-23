import helmet from "helmet";

export default helmet.hsts({
	maxAge: 86400,
	includeSubDomains: true,
	preload: true
});
