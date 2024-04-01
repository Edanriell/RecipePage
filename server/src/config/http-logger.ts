import { Request, Response } from "express";

enum HttpHeaders {
	ResponseTime = "x-response-time",
	ForwardedFor = "x-forwarded-for"
}

type THttpLoggerResponseData = {
	request: THttpLoggerRequest;
	response: THttpLoggerResponse;
};

type THttpLoggerRequest = {
	headers: any;
	host?: string;
	baseUrl: string;
	url: string;
	method: string;
	body: any;
	params: any;
	query: any;
	clientIp?: string | string[];
};

type THttpLoggerResponse = {
	headers: any;
	statusCode: number;
	requestDuration: string;
	body: any;
};

// Example of SensitiveKeys, could be anything.
enum SensitiveKeys {
	Password = "password",
	NewPassword = "new_password",
	OldPassword = "old_password",
	RepeatPassword = "repeat_password"
}

enum SpecialMessages {
	Sanitized = "*****"
}

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];

// Used to obscure senstitive information from logs, such as passwords
const sanitizeLogData = (data: any): any => {
	// to avoid calling redact function on native Mongoose/MongoDB model
	// we check if !data.constructor.name.startsWith('model')

	if (typeof data === "object" && data !== null && !data.constructor.name.startsWith("model")) {
		if (Array.isArray(data)) {
			return data.map((item) => sanitizeLogData(item));
		}

		const sanitizedData: any = {};

		for (const key in data) {
			if (sensitiveKeysList.includes(key)) {
				sanitizedData[key] = SpecialMessages.Sanitized;
			} else {
				// Recursively redact sensitive keys within nested objects
				sanitizedData[key] = sanitizeLogData(data[key]);
			}
		}

		return sanitizedData;
	} else {
		return data;
	}
};

const formatHTTPLoggerResponse = (
	req: Request,
	res: Response,
	responseBody: any,
	requestStartTime?: number
): THttpLoggerResponseData => {
	let requestDuration = ".";

	if (requestStartTime) {
		const endTime = Date.now() - requestStartTime;
		requestDuration = `${endTime / 1000}s`; // ms to s
	}

	return {
		request: {
			headers: req.headers,
			host: req.headers.host,
			baseUrl: req.baseUrl,
			url: req.url,
			method: req.method,
			body: req.body,
			params: req?.params,
			query: req?.query,
			clientIp: req?.headers[HttpHeaders.ForwardedFor] ?? req?.socket.remoteAddress
		},
		response: {
			headers: res.getHeaders(),
			statusCode: res.statusCode,
			requestDuration,
			body: sanitizeLogData(responseBody)
		}
	};
};

export { formatHTTPLoggerResponse };
