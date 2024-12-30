import { isAxiosError } from 'axios';

export class CustomError extends Error {
	status?: number;
	constructor(message: string, status?: number) {
		super(message);
		this.status = status;
	}
}

export const createCustomError = (err: any): CustomError => {
	if (isAxiosError(err)) {
		const res = err.response?.data;
		if ('status' in res && 'message' in res) {
			return new CustomError(res.message, res.status);
		}
		return new CustomError('An error has occured', +(err.code || 500));
	}
	return new CustomError('An error has occured', 500);
};
