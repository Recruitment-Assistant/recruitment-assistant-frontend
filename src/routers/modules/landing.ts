import type { RouteRecordRaw } from 'vue-router';

export const landingRoute: RouteRecordRaw[] = [
	{
		path: '',
		name: 'Landing Page',
		component: () => import('@/pages/LandingPage.vue'),
	},
];
