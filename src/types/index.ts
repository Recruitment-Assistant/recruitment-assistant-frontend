import type { HTMLAttributes } from 'vue';

export * from './api.ts';
export * from './exception.ts';
export * from './organization';
export * from './user.ts';
export * from './department.ts';
export * from './position.ts';
export * from './file.ts';
export * from './applications';
export * from './pipeline.ts';
export * from './jobs';

export interface IBaseResponse {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface ITokenResponse {
	access_token: string;
	refresh_token: string;
	user_id: string;
	token_expires: number;
	organization_id?: string;
}

export interface RouteType {
	id: string;
	path: string;
	name: string;
	icon?: any;
	activeIcon?: any;
	children?: RouteType[];
}

export interface ComboboxType {
	label: string;
	value: string;
}

export interface FormFieldCommon {
	name: string;
	label: string;
	placeholder?: string;
	inputClass?: HTMLAttributes['class'];
	icon?: any;
	required?: boolean;
	modelValue?: string | number | string[] | File | boolean;
	defaultValue?: string | number | string[];
}

export interface FilterAccordion {
	value: string;
	title: string;
	items?: ComboboxType[];
	icon: any;
	type: 'list' | 'numberSlider' | 'timeRange';
	min?: number;
	max?: number;
	step?: number;
}

export interface FilterData {
	field: string;
	filters: ComboboxType[];
}

export interface ActionGroupType {
	label: string;
	icon: any;
	style?: string;
}

export interface IPaging {
	has_next_page: boolean;
	has_previous_page: boolean;
	limit: number;
	current_page: number;
	total_pages: number;
	total_records: number;
}
