import { Request, Response } from "express";

enum HTTPHeaders {
	ResponseTime = "x-response-time",
	ForwardedFor = "x-forwarded-for"
}

enum SensitiveKeys {
	Password = "password",
	NewPassword = "new_password",
	OldPassword = "old_password",
	RepeatPassword = "repeat_password"
}

enum SpecialMessages {
	Redacted = "*****",
	DottedLine = ". . . . . . ."
}

type THTTPLoggerResponseData = {
	request: THTTPLoggerRequest;
	response: THTTPLoggerResponse;
};

interface THTTPLoggerRequest {
	headers: any;
	host?: string;
	baseUrl: string;
	url: string;
	method: string;
	body: any;
	params: any;
	query: any;
	clientIp?: string | string[];
}

interface THTTPLoggerResponse {
	headers: any;
	statusCode: number;
	requestDuration: string;
	body: any;
}

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];

// Used to obscure senstitive information from logs, such as passwords
const redactLogData = (data: any): any => {
	// to avoid calling redact function on native Mongoose/MongoDB model
	// we check if !data.constructor.name.startsWith('model')

	if (typeof data === "object" && data !== null && !data.constructor.name.startsWith("model")) {
		if (Array.isArray(data)) {
			return data.map((item) => redactLogData(item));
		}

		const redactedData: any = {};

		for (const key in data) {
			if (sensitiveKeysList.includes(key)) {
				redactedData[key] = SpecialMessages.Redacted;
			} else {
				// Recursively redact sensitive keys within nested objects
				redactedData[key] = redactLogData(data[key]);
			}
		}

		return redactedData;
	} else {
		return data;
	}
};

const formatHTTPLoggerResponse = (
	req: Request,
	res: Response,
	responseBody: any,
	requestStartTime?: number
): THTTPLoggerResponseData => {
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
			clientIp: req?.headers[HTTPHeaders.ForwardedFor] ?? req?.socket.remoteAddress
		},
		response: {
			headers: res.getHeaders(),
			statusCode: res.statusCode,
			requestDuration,
			body: redactLogData(responseBody)
		}
	};
};

export { formatHTTPLoggerResponse };
