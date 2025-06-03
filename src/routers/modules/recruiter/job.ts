import type { RouteRecordRaw } from 'vue-router';

export const jobRoute: RouteRecordRaw[] = [
	{
		path: ':id',
		name: 'Job Detail',
		component: () => import('@/components/jobs/JobDetailView.vue'),
		props: (route: any): { id: string } => ({
			id: route.params.id,
		}),
	},
	{
		path: ':id/apply',
		name: 'Apply job',
		meta: {
			layout: () => import('@/layouts/PlainLayout.vue'),
		},
		component: () => import('@/components/jobs/JobDetailView.vue'),
		props: (route: any): { id: string } => ({
			id: route.params.id,
		}),
	},
];
