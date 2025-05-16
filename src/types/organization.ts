import type { IBaseResponse } from '@/types/index.ts';
import type { BaseUser } from '@/types/user.ts';

export interface Organization extends IBaseResponse {
	name: string;
	address: string;
	logo_url: string;
	joined_at: string;
	is_owner: boolean;
	created_by_user: BaseUser;
}

export interface CreateOrganizationPayload {
	name: 'string';
	address: 'string';
	logo_url: 'string';
}
