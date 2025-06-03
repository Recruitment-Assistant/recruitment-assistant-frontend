import type { RouteRecordRaw } from 'vue-router';
import { authRoute } from '@/routers/modules/auth.ts';
import { organizationRoute } from '@/routers/modules/organization.ts';
import { publicJobRoute } from '@/routers/modules/public-job.ts';
import { recruiterRoute } from '@/routers/modules/recruiter';

export const webRoutes: RouteRecordRaw[] = [
	{
		path: '/landing',
		name: 'Landing Page',
		component: () => import('@/pages/LandingPage.vue'),
	},
	{
		path: '/jobs',
		name: 'Public Job Pages',
		component: () => import('@/layouts/PlainLayout.vue'),
		children: publicJobRoute,
	},
	{
		path: '/auth',
		component: () => import('@/pages/auth/index.vue'),
		children: authRoute,
	},
	{
		path: '/organization',
		name: 'Organization',
		component: () => import('@/layouts/PlainLayout.vue'),
		children: organizationRoute,
	},
	{
		path: '/recruiter',
		name: 'Home',
		redirect: '/recruiter/dashboard',
		component: () => import('@/layouts/MainLayout.vue'),
		meta: {
			requiresAuth: true,
		},
		children: recruiterRoute,
	},
];
