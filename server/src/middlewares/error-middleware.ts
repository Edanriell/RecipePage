import { Request, Response, NextFunction } from "express";

import { ApiError } from "../exceptions";

const errorMiddleware = ({
	error,
	request,
	response,
	next
}: {
	error: Error;
	request: Request;
	response: Response;
	next: NextFunction;
}) => {
	console.log(error);
	if (error instanceof ApiError) {
		return response.status(error.status).json({ message: error.message, errors: error.errors });
	}
	return response.status(500).json({ message: "Unexpected error occurred." });
};

export { errorMiddleware };
