import type { RouteRecordRaw } from 'vue-router';
import { jobRoute } from '@/routers/modules/recruiter/job.ts';

export const recruiterRoute: RouteRecordRaw[] = [
	{
		path: '/recruiter/dashboard',
		name: 'Dashboard',
		component: () => import('@/pages/dashboard/index.vue'),
	},
	{
		path: '/recruiter/jobs',
		name: 'Jobs',
		component: () => import('@/pages/jobs/index.vue'),
		children: jobRoute,
	},
	{
		path: '/recruiter/candidates',
		name: 'Candidates',
		component: () => import('@/pages/candidates/index.vue'),
	},
	{
		path: '/recruiter/interviews',
		name: 'Interviews',
		component: () => import('@/pages/interviews/index.vue'),
	},
	{
		path: '/recruiter/talent-pool',
		name: 'Talent Pool',
		component: () => import('@/pages/talent-pool/index.vue'),
	},
	{
		path: '/recruiter/settings',
		name: 'Settings',
		component: () => import('@/pages/settings/index.vue'),
	},
	{
		path: '/recruiter/test',
		name: 'Test',
		component: () => import('@/pages/test/index.vue'),
	},
];
