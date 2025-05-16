export interface ApiError {
	timestamp: string;
	status_code: number;
	error: string;
	error_code: string;
	message: string;
	details?: [
		{
			property: string;
			code: string;
			message: string;
		},
	];
}
