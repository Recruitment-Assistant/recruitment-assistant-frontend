import type { RouteRecordRaw } from 'vue-router';

export const publicJobRoute: RouteRecordRaw[] = [
	{
		path: '',
		name: 'Public Job List',
		component: () => import('@/components/jobs/guest/JobHub.vue'),
	},
	{
		path: ':id',
		name: 'Public Job Detail',
		component: () => import('@/components/jobs/JobDetailView.vue'),
		props: (route: any): { id: string } => ({
			id: route.params.id,
		}),
	},
	{
		path: ':id/apply',
		name: 'Public Job Apply',
		meta: {
			layout: () => import('@/layouts/PlainLayout.vue'),
		},
		component: () => import('@/components/jobs/JobApply.vue'),
		props: (route: any): { id: string } => ({
			id: route.params.id,
		}),
	},
];
