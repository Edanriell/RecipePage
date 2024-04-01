import express, { Application } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

import { appConfig } from "./config/common";
import { corsConfig } from "./config/cors-protection";
import { tooBusyConfig } from "./config/toobusy";
import { rateLimiterConfig } from "./config/rate-limiter";
import { httpsConfig } from "./config/https-enforcer";
import { EndpointsConfig } from "./config/endpoints";
import { InfoMessages, SpecialMessages, ErrorMessages } from "./config/http-logger.ts";
import { connectToMongoDb } from "./config/mongoDb";
import { errorMiddleware, loggerMiddleware } from "./middlewares";
import { RecipesService, httpLogger, cliLogger } from "./services";

const app: Application = express();

app.use(corsConfig);
app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(httpsConfig);
app.use(rateLimiterConfig);
app.use(tooBusyConfig);
app.use(loggerMiddleware);
new EndpointsConfig(app);
app.use(errorMiddleware);

const startServer = async () => {
	try {
		await Promise.all([connectToMongoDb()]);

		await RecipesService.getServiceInstance().initializeRecipes();

		cliLogger.info(InfoMessages.DatabasesConnected);
		cliLogger.info(SpecialMessages.DottedLine);

		const PORT = Number(appConfig.port);

		app.listen(PORT, (): void => {
			cliLogger.info(`Server started on port ${PORT} 🚀`);
		});
	} catch (error: unknown) {
		cliLogger.error("Server startup failed! ❌");
		httpLogger.error(ErrorMessages.AppStartupFail, { error });
	}
};

startServer();
