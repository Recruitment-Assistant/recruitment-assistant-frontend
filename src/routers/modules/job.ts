import type { RouteRecordRaw } from 'vue-router';

export const jobRoute: RouteRecordRaw[] = [
	{
		path: '',
		name: '',
		component: () => import('@/pages/jobs/index.vue'),
	},
	{
		path: '/:id',
		name: 'Job Detail',
		component: () => import('@/components/jobs/JobDetail.vue'),
	},
];
