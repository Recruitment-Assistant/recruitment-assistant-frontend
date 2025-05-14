interface RouteType {
	path: string;
	name: string;
	component?: any;
	redirect?: any;
	children?: any;
	meta?: any;
}

export const webRoutes: RouteType[] = [
	{
		path: '/landing',
		name: 'Landing',
		component: () => import('@/layouts/PlainLayout.vue'),
		children: [
			{
				path: '',
				name: 'Landing Page',
				component: () => import('@/pages/LandingPage.vue'),
			},
		],
	},
	{
		path: '/auth',
		name: 'Auth',
		redirect: '/auth/login',
		component: () => import('@/pages/auth/index.vue'),
		children: [
			{
				path: 'login',
				name: 'Login',
				component: () => import('@/components/auth/login/Login.vue'),
			},
			{
				path: 'forgot-password',
				name: 'Forgot Password',
				children: [
					{
						path: '',
						name: 'Enter email',
						component: () =>
							import('@/components/auth/forgot-password/ForgotPassword.vue'),
					},
					{
						path: 'enter-otp',
						name: 'Enter otp',
						meta: {
							requiresForgotPassword: true,
						},
						component: () => import('@/components/auth/forgot-password/EnterOTP.vue'),
					},
					{
						path: 'reset-password',
						name: 'Reset password',
						meta: {
							requiresForgotPassword: true,
						},
						component: () =>
							import('@/components/auth/forgot-password/ResetPassword.vue'),
					},
				],
			},
		],
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
				path: 'jobs',
				name: 'Jobs',
				component: () => import('@/pages/jobs/index.vue'),
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
