import axios from 'axios';
import { Config } from '@/plugins/config.ts';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/routers';
import type { ITokenResponse } from '@/types';
import { useCustomToast } from '@/lib/customToast';
import type { IApiResponseV1 } from '@/types/api.ts';

NProgress.configure({ showSpinner: false });

const axiosClient = axios.create({
	baseURL: Config.baseURL,
});

axiosClient.interceptors.request.use(
	function (config) {
		NProgress.start();
		// config.headers['Content-Type'] = 'application/json';
		// config.headers['Accept'] = 'application/json';
		if (!(config.data instanceof FormData)) {
			config.headers['Content-Type'] = 'application/json';
			config.headers['Accept'] = 'application/json';
		}
		config.headers['Access-Control-Allow-Origin'] = '*';

		const accessToken = localStorage.getItem(Config.key.accessToken);
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

const isAllowRefreshToken = (error: any) => {
	return (
		error.response &&
		!error.config._retry &&
		Config.retryStatusCodes.includes(error.response.status) &&
		!error.config?.url?.includes('/login') &&
		!error.config?.url?.includes('/refresh-token')
	);
};

const refreshToken = async () => {
	const authStore = useAuthStore();
	const refresh_token = localStorage.getItem(Config.key.refreshToken);

	if (!refresh_token) {
		authStore.clearLocalStorage();
		router.push('/auth');
		return false;
	}

	try {
		const { data } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
			Config.path.refreshToken,
			{
				refresh_token,
			},
		);

		const token = data.data;
		await authStore.setupAuth(token.access_token, token.refresh_token);
		return true;
	} catch (error) {
		authStore.clearLocalStorage();
		router.push('/auth/login');
		return false;
	}
};

axiosClient.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	async (error) => {
		if (isAllowRefreshToken(error)) {
			const originalRequest = error.config;
			const authStore = useAuthStore();

			originalRequest._retry = true;

			const isSuccess = await refreshToken();
			if (isSuccess) {
				axiosClient.defaults.headers.common['Authorization'] =
					`Bearer ${authStore.access_token}`;
				return axiosClient(originalRequest);
			}

			authStore.clearLocalStorage();
			router.push('/auth/login');
		}

		const { showToast } = useCustomToast();
		const data = error.response?.data as IApiResponseV1<any>;
		showToast({
			message: data.error?.message || 'An error occurred',
			type: 'error',
		});

		NProgress.done();
		return error.response;
	},
);
export default axiosClient;
