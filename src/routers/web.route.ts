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
				path: 'applicants',
				name: 'Applicants',
				component: () => import('@/pages/applicants/index.vue'),
			},
			{
				path: 'talent-pool',
				name: 'Talent Pool',
				component: () => import('@/pages/talent-pool/index.vue'),
			},
			{
				path: '/test',
				name: 'Test',
				component: () => import('@/pages/test/index.vue'),
			},
		],
	},
];
