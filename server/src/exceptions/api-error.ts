class ApiError extends Error {
	status;
	errors;

	constructor({ status, message, errors = [] }: { status: number; message: string; errors: any }) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static BadRequest(message, errors = []) {
		return new ApiError({ status: 400, message, errors });
	}

	static NotFound(message, errors = []) {
		return new ApiError({ status: 404, message, errors });
	}

	static InternalServerError(message, errors = []) {
		return new ApiError({ status: 500, message, errors });
	}
}

export { ApiError };
