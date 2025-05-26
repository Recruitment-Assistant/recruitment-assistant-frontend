import type { ApiError, IPaging } from '@/types/index.ts';
import { ORDER } from '@/constants';

export interface IApiResponseV1<T> {
	status: 'success' | 'failed';
	status_code: number;
	data: T;
	meta?: IPaging;
	error?: ApiError;
}

export interface IFilterRequest {
	page?: number;
	limit?: number;
	keywords?: string;
	order?: ORDER;
}
