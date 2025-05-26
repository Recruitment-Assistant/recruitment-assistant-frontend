import { jobRoute } from '@/routers/modules/job.ts';
import type { RouteRecordRaw } from 'vue-router';
import { authRoute } from '@/routers/modules/auth.ts';
import { landingRoute } from '@/routers/modules/landing.ts';
import { organizationRoute } from '@/routers/modules/organization.ts';

export const webRoutes: RouteRecordRaw[] = [
	{
		path: '/landing',
		name: 'Landing',
		component: () => import('@/layouts/PlainLayout.vue'),
		children: landingRoute,
	},
	{
		path: '/auth',
		component: () => import('@/layouts/PlainLayout.vue'),
		children: authRoute,
	},
	{
		path: '/auth',
		component: () => import('@/pages/auth/index.vue'),
		children: authRoute,
	},
	{
		path: '/jobs',
		name: 'Jobs',
		component: () => import('@/layouts/MainLayout.vue'),
		children: jobRoute,
	},
	{
		path: '/organization',
		name: 'Organization',
		component: () => import('@/layouts/PlainLayout.vue'),
		children: organizationRoute,
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
		component: () => import('@/layouts/MainLayout.vue'),
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import('@/pages/dashboard/index.vue'),
			},
			{
				path: 'candidates',
				name: 'Candidates',
				component: () => import('@/pages/candidates/index.vue'),
			},
			{
				path: 'interviews',
				name: 'Interviews',
				component: () => import('@/pages/interviews/index.vue'),
			},
			{
				path: 'talent-pool',
				name: 'Talent Pool',
				component: () => import('@/pages/talent-pool/index.vue'),
			},
			{
				path: 'settings',
				name: 'Settings',
				component: () => import('@/pages/settings/index.vue'),
			},
			{
				path: '/test',
				name: 'Test',
				component: () => import('@/pages/test/index.vue'),
			},
		],
	},
];
