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
];
