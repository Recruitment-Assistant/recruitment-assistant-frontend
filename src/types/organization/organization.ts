import type { IBaseResponse } from '@/types';
import type { BaseUser } from '@/types/user.ts';

export interface Organization extends IBaseResponse {
	name: string;
	address: string;
	logo_url: string;
	joined_at: string;
	is_owner: boolean;
	created_by_user: BaseUser;
}
