import express, { Application } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

import {
	appConfig,
	connectToMongoDb,
	corsConfig,
	EndpointsConfig,
	ErrorMessages,
	httpsConfig,
	InfoMessages,
	rateLimiterConfig,
	SpecialMessages,
	tooBusyConfig
} from "./config";
import { errorMiddleware, loggerMiddleware } from "./middlewares";
import { cliLogger, endpointsLogger, RecipesService } from "./services";

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

		cliLogger.info(InfoMessages.DatabasesConnected);
		cliLogger.info(SpecialMessages.DottedLine);

		await RecipesService.getServiceInstance().initializeRecipes();

		cliLogger.info(SpecialMessages.DottedLine);

		const PORT = Number(appConfig.port);

		app.listen(PORT, (): void => {
			cliLogger.info(`Server started on port ${PORT} 🚀`);
		});
	} catch (error: unknown) {
		cliLogger.error("Server startup failed! ❌");
		endpointsLogger.error(ErrorMessages.AppStartupFail, { error });
	}
};

startServer();
