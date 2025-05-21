import axiosClient from '@/plugins';
import type { ITokenResponse } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Config } from '@/plugins/config.ts';
import { AUTH_API } from '@/constants/api/auth.api';
import type { IApiResponseV1 } from '@/types/api.ts';
import type { User } from '@/types/user.ts';
import { USER_API } from '@/constants/api/user.api.ts';
import { getMyOrganization, switchOrganization } from '@/services/organization.service.ts';

export const useAuthStore = defineStore('auth-store', () => {
	/**
	 *  define state
	 */
	const isLoading = ref(false);
	const access_token = ref<string>(localStorage.getItem(Config.key.accessToken) || '');
	const refresh_token = ref<string>(localStorage.getItem(Config.key.refreshToken) || '');
	const forgot_password_token = ref<string | undefined>();
	const account = ref<User | null>(
		localStorage.getItem(Config.key.account)
			? JSON.parse(localStorage.getItem(Config.key.account) as string)
			: null,
	);

	/**
	 *  define getter
	 */
	const isLoggedIn = computed(() => access_token.value !== '' && refresh_token.value !== '');
	const isForgotPassword = computed(() => forgot_password_token.value !== undefined);

	/**
	 *  define action
	 */
	const login = async (payload: { email: string; password: string }, remember?: boolean) => {
		isLoading.value = true;
		const { data, status } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
			AUTH_API.LOGIN,
			payload,
		);
		if (status >= 400) {
			isLoading.value = false;
			return status;
		}

		const token = data.data;
		setToken(token.access_token, token.refresh_token);

		await getUser();
		await setupOrganization();
		isLoading.value = false;
		return status;
	};

	const setupOrganization = async () => {
		const organizations = await getMyOrganization();
		if (organizations && organizations.length > 0) {
			const token = await switchOrganization(organizations[0].id);
			setToken(token.access_token, token.refresh_token);
			setCurrenOrganization(organizations[0].id);
		}
	};

	const getUser = async () => {
		const { data, status } = await axiosClient.get<IApiResponseV1<User>>(USER_API.CURRENT_USER);
		if (status >= 400) {
			return;
		}
		const user = data.data;
		account.value = user;
		localStorage.setItem(Config.key.account, JSON.stringify(user));
	};

	const logout = async () => {
		const { status } = await axiosClient.post(AUTH_API.LOGOUT);
		if (status >= 400) {
			return status;
		}

		clearLocalStorage();
		return status;
	};

	const clearLocalStorage = () => {
		localStorage.removeItem(Config.key.accessToken);
		localStorage.removeItem(Config.key.refreshToken);
		localStorage.removeItem(Config.key.account);

		access_token.value = '';
		refresh_token.value = '';
	};

	const setCurrenOrganization = (orgId: string) => {
		localStorage.setItem('organization_id', orgId);
	};

	const setToken = (accessToken: string, refreshToken: string) => {
		access_token.value = accessToken;
		refresh_token.value = refreshToken;
		localStorage.setItem(Config.key.accessToken, accessToken);
		localStorage.setItem(Config.key.refreshToken, refreshToken);
	};

	const forgotPassword = async (email: string) => {
		const { data, status } = await axiosClient.post(AUTH_API.FORGOT_PASSWORD, { email });
		if (status >= 400) {
			return status;
		}

		forgot_password_token.value = data.data.token;
		return status;
	};

	const verifyCode = async (code: string): Promise<number> => {
		const { status } = await axiosClient.post(AUTH_API.VERIFY_PINCODE, {
			pin_code: code,
			token: forgot_password_token.value,
		});
		if (status >= 400) {
			return status;
		}
		return status;
	};

	const resetPassword = async (password: string, confirm_password: string): Promise<number> => {
		const { status } = await axiosClient.post(AUTH_API.RESET_PASSWORD, {
			password,
			confirm_password,
			token: forgot_password_token.value,
		});

		if (status >= 400) {
			return status;
		}

		return status;
	};

	return {
		isLoading,
		isLoggedIn,
		access_token,
		refresh_token,
		isForgotPassword,
		forgot_password_token,
		account,
		login,
		logout,
		setToken,
		clearLocalStorage,
		forgotPassword,
		verifyCode,
		resetPassword,
		setupOrganization,
	};
});
