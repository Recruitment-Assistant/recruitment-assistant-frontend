import { createRouter, createWebHistory } from 'vue-router';
import { webRoutes } from './web.route';
import { useAuthStore } from '@/stores/auth.store';

const routes = [
	...webRoutes,
	{
		path: '/:catchAll(.*)',
		name: '404 NotFound',
		component: () => import('@/pages/error/_404.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'isActive',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();

	const isLoggedIn = authStore.isLoggedIn;
	const hasOrganization = !!authStore.organizationId;

	const isAuthRoute = to.matched.some((record) => record.meta.requiresAuth);
	const isAuthForgotPassword = to.matched.some((record) => record.meta.requiresForgotPassword);
	const isCreateOrganizationRoute = to.path === '/organization/create';
	const isJoinOrganizationRoute = to.path === '/organization/join';
	const isLandingPage = to.path === '/landing' || to.path === '/';

	if (isAuthForgotPassword && !authStore.isForgotPassword) {
		next('/auth/forgot-password');
		return;
	}

	if (isAuthRoute && !isLoggedIn) {
		authStore.clearLocalStorage();
		next('/landing');
		return;
	}

	if (isLoggedIn && !hasOrganization && !isCreateOrganizationRoute && !isJoinOrganizationRoute) {
		return next('/organization/create');
	}

	if (isLoggedIn && hasOrganization && (isCreateOrganizationRoute || isJoinOrganizationRoute)) {
		return next('/recruiter');
	}

	if (isLoggedIn && isLandingPage) {
		return next('/recruiter');
	}

	if (isLandingPage) {
		return next('/job');
	}

	next();
});

export default router;
