import type { IFilterRequest } from '@/types/api.ts';
import type { IBaseResponse } from '@/types/index.ts';

export interface IPositionFilter extends IFilterRequest {}

export interface Position extends IBaseResponse {
	title: string;
	description: string;
	organization_id: string;
}
