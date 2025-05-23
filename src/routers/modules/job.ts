import type { RouteRecordRaw } from 'vue-router';

export const jobRoute: RouteRecordRaw[] = [
	{
		path: '',
		name: 'List',
		component: () => import('@/pages/jobs/index.vue'),
	},
	{
		path: ':id',
		name: 'Job Detail',
		component: () => import('@/components/jobs/JobDetailView.vue'),
		props: (route: any): { id: string } => ({
			id: route.params.id,
		}),
	},
];
