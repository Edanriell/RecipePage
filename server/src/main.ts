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
import { diConfig } from "./config/di-container";
import { routerConfig } from "./config/router.ts";

const app: Application = express();

app.use(corsConfig);
app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(httpsConfig);
app.use(rateLimiterConfig);
app.use(tooBusyConfig);

const diContainer = diConfig();
routerConfig(app, diContainer);

const startServer = async () => {
	try {
		// await mongoose.connect(Config.dbUrl!);

		app.listen(appConfig.port, (): void => {
			console.log(`Connected successfully on port ${appConfig.port}`);
		});
	} catch (error) {
		console.error(`Error occured: ${error.message}`);
	}
};

startServer();
