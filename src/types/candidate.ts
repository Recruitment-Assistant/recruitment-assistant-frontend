import type { IBaseResponse } from '@/types/index.ts';

export interface BaseCandidate extends IBaseResponse {
	name: string;
	email: string;
	phone_number?: string;
}

export interface KanbanCandidateItem extends BaseCandidate {
	applied?: string;
}
