import { NextFunction, Request, Response } from "express";
import { httpLogger } from "../services/logger-service.ts";
import { formatHTTPLoggerResponse } from "../config/http-logger.ts";

export enum HTTPMethods {
	HEAD = "HEAD",
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE"
}

export enum SuccessMessages {
	CreateSuccess = "Resource created successfully",
	GetSuccess = "Resource retrieved successfully",
	UpdateSuccess = "Resource updated successfully",
	DeleteSuccess = "Resource deleted successfully",
	GenericSuccess = "Operation completed successfully"
}

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const requestStartTime = Date.now();

	const originalSend = res.send;

	let responseSent = false;

	res.send = function (body: any): Response {
		if (!responseSent) {
			if (res.statusCode < 400) {
				httpLogger.info(
					getResponseMessage(req.method),
					formatHTTPLoggerResponse(req, res, body, requestStartTime)
				);
			} else {
				httpLogger.error(body.message, formatHTTPLoggerResponse(req, res, body, requestStartTime));
			}

			responseSent = true;
		}

		return originalSend.call(this, body);
	};

	next();
};

export { loggerMiddleware };

function getResponseMessage(responseMethod: HTTPMethods | string): string {
	switch (responseMethod) {
		case HTTPMethods.POST:
			return SuccessMessages.CreateSuccess;
		case HTTPMethods.GET:
			return SuccessMessages.GetSuccess;
		case HTTPMethods.PUT || HTTPMethods.PATCH:
			return SuccessMessages.UpdateSuccess;
		case HTTPMethods.DELETE:
			return SuccessMessages.DeleteSuccess;
		default:
			return SuccessMessages.GenericSuccess;
	}
}
