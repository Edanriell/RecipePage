import { Request, Response } from "express";

enum HttpHeaders {
	ResponseTime = "x-response-time",
	ForwardedFor = "x-forwarded-for"
}

enum HttpMethods {
	HEAD = "HEAD",
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE"
}

enum LogIndentation {
	None = 0,
	SM = 2, // Small
	MD = 4, // Medium
	LG = 6, // Large
	XL = 8, // XLarge
	XXL = 10,
	XXXL = 12
}

enum SuccessMessages {
	CreateSuccess = "Resource created successfully",
	GetSuccess = "Resource retrieved successfully",
	UpdateSuccess = "Resource updated successfully",
	DeleteSuccess = "Resource deleted successfully",
	GenericSuccess = "Operation completed successfully"
}

enum SpecialMessages {
	Sanitized = "*****",
	DottedLine = ". . . . . . . ."
}

enum InfoMessages {
	DatabasesConnected = "Databases connected successfully!"
}

enum ErrorMessages {
	AppStartupFail = "Unable to start the app!",
	CreateFail = "Unable to save entry to DB!",
	GetFail = "Unable to retrieve data from DB!",
	UpdateFail = "Unable to update data in DB!",
	DeleteFail = "Unable to delete entry from DB!",
	DuplicateEntryFail = "User already exists!",
	PasswordMismatchFail = "Passwords must match!",
	Generic = "Something went wrong!",
	NotFound = "Unable to find the requested resource!"
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

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];

// Used to obscure sensitive information from logs, such as passwords
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

export {
	formatHTTPLoggerResponse,
	SpecialMessages,
	HttpMethods,
	LogIndentation,
	SuccessMessages,
	InfoMessages,
	ErrorMessages
};
