import type { HTMLAttributes } from 'vue';

export interface IApiResponseV1<T> {
	status: boolean;
	statusCode: number;
	data: T;
}

export interface ITokenResponse {
	access_token: string;
	refresh_token: string;
	user_id: string;
	token_expires: number;
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
	class?: HTMLAttributes['class'];
	icon?: any;
	required?: boolean;
	modelValue?: string | number;
	defaultValue?: string | number;
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
