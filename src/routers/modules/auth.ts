import type { RouteRecordRaw } from 'vue-router';

export const authRoute: RouteRecordRaw[] = [
	{
		path: 'login',
		name: 'login',
		component: () => import('@/components/auth/login/Login.vue'),
	},
	{
		path: 'forgot-password',
		name: 'Forgot Password',
		children: [
			{
				path: '',
				name: 'Enter email',
				component: () => import('@/components/auth/forgot-password/ForgotPassword.vue'),
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
				component: () => import('@/components/auth/forgot-password/ResetPassword.vue'),
			},
		],
	},
];
