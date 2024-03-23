import express, { Application, Request, Response } from "express";
import Config from "./config/common";
import bodyParser from "body-parser";
import cors from "./config/cors-protection";
import compression from "compression";
import helmet from "helmet";
import tooBusy from "./config/toobusy";
import rateLimiter from "./config/rate-limiter";
import httpsEnforcer from "./config/https-enforcer";
import mongoose from "mongoose";

const app: Application = express();

app.use(cors);
app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(httpsEnforcer);
app.use(rateLimiter);
app.use(tooBusy);

const startServer = async () => {
	try {
		// await mongoose.connect(Config.dbUrl!);

		app.listen(Config.port, (): void => {
			console.log(`Connected successfully on port ${Config.port}`);
		});
	} catch (error: any) {
		console.error(`Error occured: ${error.message}`);
	}
};

startServer();
