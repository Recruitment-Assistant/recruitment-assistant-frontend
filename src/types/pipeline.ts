import type { IBaseResponse } from '@/types/index.ts';

export interface Pipeline extends IBaseResponse {
	organization_id: string;
	name: string;
	description?: string;
	is_default: boolean;
	stages?: Stage[];
}

export interface Stage extends IBaseResponse {
	pipeline_id: string;
	name: string;
	stage_order: number;
	sla_days: number | null;
	is_terminal: boolean;
}
