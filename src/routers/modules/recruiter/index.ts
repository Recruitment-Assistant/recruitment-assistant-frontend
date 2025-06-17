import type { RouteRecordRaw } from 'vue-router';

export const recruiterRoute: RouteRecordRaw[] = [
	{
		path: '/recruiter/dashboard',
		name: 'Dashboard',
		component: () => import('@/pages/dashboard/index.vue'),
	},
	{
		path: '/recruiter/department',
		name: 'Department',
		component: () => import('@/pages/department/index.vue'),
	},
	{
		path: '/recruiter/job',
		name: 'Jobs',
		component: () => import('@/pages/jobs/index.vue'),
	},
	{
		path: '/recruiter/job/:id',
		name: 'Job Overview',
		component: () => import('@/components/jobs/JobOverview.vue'),
		props: (route: any): { id: string } => ({
			id: route.params.id,
		}),
	},
	{
		path: '/recruiter/candidate',
		name: 'Candidates',
		component: () => import('@/pages/candidates/index.vue'),
	},
	{
		path: '/recruiter/interview',
		name: 'Interviews',
		component: () => import('@/pages/interviews/index.vue'),
	},
	{
		path: '/recruiter/talent-pool',
		name: 'Talent Pool',
		component: () => import('@/pages/talent-pool/index.vue'),
	},
	{
		path: '/recruiter/setting',
		name: 'Settings',
		component: () => import('@/pages/settings/index.vue'),
	},
	{
		path: '/recruiter/administration',
		name: 'Administration',
		component: () => import('@/pages/administration/index.vue'),
	},
	{
		path: '/recruiter/test',
		name: 'Test',
		component: () => import('@/pages/test/index.vue'),
	},
];
