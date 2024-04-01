import { NextFunction, Request, Response } from "express";

import { formatHTTPLoggerResponse, HttpMethods, SuccessMessages } from "../config";
import { endpointsLogger, dbLogger } from "../services";

const getResponseMessage = (responseMethod: HttpMethods | string): string => {
	switch (responseMethod) {
		case HttpMethods.POST:
			return SuccessMessages.CreateSuccess;
		case HttpMethods.GET:
			return SuccessMessages.GetSuccess;
		case HttpMethods.PUT || HttpMethods.PATCH:
			return SuccessMessages.UpdateSuccess;
		case HttpMethods.DELETE:
			return SuccessMessages.DeleteSuccess;
		default:
			return SuccessMessages.GenericSuccess;
	}
};

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const requestStartTime = Date.now();

	const originalSend = res.send;

	let responseSent = false;

	res.send = function (body: any): Response {
		if (!responseSent) {
			if (res.statusCode < 400) {
				endpointsLogger.info(
					getResponseMessage(req.method),
					formatHTTPLoggerResponse(req, res, body, requestStartTime)
				);
				dbLogger.info(
					getResponseMessage(req.method),
					formatHTTPLoggerResponse(req, res, body, requestStartTime)
				);
			} else {
				endpointsLogger.error(
					body.message,
					formatHTTPLoggerResponse(req, res, body, requestStartTime)
				);
				dbLogger.error(body.message, formatHTTPLoggerResponse(req, res, body, requestStartTime));
			}

			responseSent = true;
		}

		return originalSend.call(this, body);
	};

	next();
};

export { loggerMiddleware };
