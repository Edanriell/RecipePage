class ApiError extends Error {
	status: number;
	errors: Error[];

	constructor({
		status,
		message,
		errors = []
	}: {
		status: number;
		message: string;
		errors?: Error[];
	}) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static BadRequest(message: string, errors: Error[] = []): ApiError {
		return new ApiError({ status: 400, message, errors });
	}

	static NotFound(message: string, errors: Error[] = []): ApiError {
		return new ApiError({ status: 404, message, errors });
	}

	static InternalServerError(message: string, errors: Error[] = []): ApiError {
		return new ApiError({ status: 500, message, errors });
	}
}

export { ApiError };
