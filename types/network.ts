export interface SuccessResponse<T> {
	success: true;
	data: T;
}

export interface ErrorResponse<T = { message: string }> {
	success: false;
	errors: T;
}
