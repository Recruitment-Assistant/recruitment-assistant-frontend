import type { RouteRecordRaw } from 'vue-router';

export const organizationRoute: RouteRecordRaw[] = [
	{
		path: 'create',
		name: 'Init Organization',
		component: () => import('@/pages/organization/index.vue'),
	},
];
