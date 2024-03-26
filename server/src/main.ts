import express, { Application } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import mongoose from "mongoose";

import { appConfig } from "./config/common";
import { corsConfig } from "./config/cors-protection";
import { tooBusyConfig } from "./config/toobusy";
import { rateLimiterConfig } from "./config/rate-limiter";
import { httpsConfig } from "./config/https-enforcer";
import { EndpointsConfig } from "./config/endpoints.ts";
import { errorMiddleware } from "./middlewares";

const app: Application = express();

app.use(corsConfig);
app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(httpsConfig);
app.use(rateLimiterConfig);
app.use(tooBusyConfig);
new EndpointsConfig(app);
app.use(errorMiddleware);

const startServer = async () => {
	try {
		// await mongoose.connect(Config.dbUrl!);

		app.listen(appConfig.port, (): void => {
			console.log(`Server listening on port ${appConfig.port}`);
		});
	} catch (error) {
		console.error(`Error occured: ${error}`);
	}
};

startServer();
