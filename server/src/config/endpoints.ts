import { Application } from "express";

import { recipesEndpoints } from "../endpoints";

class EndpointsConfig {
	constructor(app: Application) {
		app.use("/api", recipesEndpoints);
	}
}

export { EndpointsConfig };
