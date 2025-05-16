import type { IBaseResponse } from '@/types/index.ts';

export interface User extends IBaseResponse {
	email: string;
	name: string;
	avatar: string;
	gender: string;
	date_of_birth: string;
	roles: string[];
}

export interface BaseUser {
	id: string;
	email: string;
	name: string;
	avatar: string;
}
