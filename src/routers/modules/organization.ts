import type { RouteRecordRaw } from 'vue-router';

export const organizationRoute: RouteRecordRaw[] = [
	{
		path: 'create',
		name: 'Landing Page',
		component: () => import('@/pages/organization/index.vue'),
	},
];
