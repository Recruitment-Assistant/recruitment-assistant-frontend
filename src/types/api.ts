import type { IPaging } from '@/types/index.ts';

export interface IApiResponseV1<T> {
	status: 'success' | 'failed';
	status_code: number;
	data: T;
	meta?: IPaging;
}
