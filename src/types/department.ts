import type { IFilterRequest } from '@/types/api.ts';
import type { IBaseResponse } from '@/types/index.ts';

export interface IDepartmentFilter extends IFilterRequest {}

export interface Department extends IBaseResponse {
	name: string;
	code: string;
	description: string;
	organization_id: string;
}
