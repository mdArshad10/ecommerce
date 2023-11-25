class ErrorHandler extends Error {
	constructor(
		statusCode = 404,
		message = 'something worng',
		error = [],
		stack = '',
	) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.status = false;
		this.data = null;
		this.error = error;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
