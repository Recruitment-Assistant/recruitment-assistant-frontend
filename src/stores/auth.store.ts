import axiosClient from '@/plugins';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Config } from '@/plugins/config.ts';
import { AUTH_API } from '@/constants/api/auth.api';
import type { User } from '@/types/user.ts';
import { loginApi, loginGGApi } from '@/services/auth.service.ts';
import { getUserApi } from '@/services/user.service.ts';
import type { CreateOrganizationPayload } from '@/types';
import { createOrganizationApi } from '@/services/organization.service.ts';
import router from '@/routers';

export const useAuthStore = defineStore('auth-store', () => {
	/**
	 *  define state
	 */
	const isLoading = ref(false);
	const access_token = ref<string>(localStorage.getItem(Config.key.accessToken) || '');
	const refresh_token = ref<string>(localStorage.getItem(Config.key.refreshToken) || '');
	const organizationId = ref<string>(localStorage.getItem(Config.key.organizationId) || '');
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
		const { data, status_code } = await loginApi(payload);
		if (status_code >= 400) {
			isLoading.value = false;
			return status_code;
		}

		await setupAuth(data.access_token, data.refresh_token);
		if (data.organization_id) {
			setupOrg(data.organization_id);
		}
		isLoading.value = false;
		return status_code;
	};

	const loginGG = async (access_token: string) => {
		isLoading.value = true;
		const { data, status_code } = await loginGGApi(access_token);
		if (status_code >= 400) {
			isLoading.value = false;
			return status_code;
		}

		await setupAuth(data.access_token, data.refresh_token);
		if (data.organization_id) {
			setupOrg(data.organization_id);
		}
		isLoading.value = false;

		router.push('/');
		return status_code;
	};

	const getUser = async () => {
		const { data, status_code } = await getUserApi();
		if (status_code >= 400) {
			return;
		}
		account.value = data;
		localStorage.setItem(Config.key.account, JSON.stringify(data));
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
		localStorage.removeItem(Config.key.organizationId);

		access_token.value = '';
		refresh_token.value = '';
		organizationId.value = '';
		account.value = null;
	};

	const setupAuth = async (accessToken: string, refreshToken: string) => {
		access_token.value = accessToken;
		refresh_token.value = refreshToken;
		localStorage.setItem(Config.key.accessToken, accessToken);
		localStorage.setItem(Config.key.refreshToken, refreshToken);

		await getUser();
	};

	const setupOrg = (orgId: string) => {
		localStorage.setItem(Config.key.organizationId, orgId);
		organizationId.value = orgId;
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

	const initOrganizationContext = async (payload: CreateOrganizationPayload) => {
		const { data, status_code } = await createOrganizationApi(payload);
		if (status_code >= 400) {
			return status_code;
		}

		await setupAuth(data.access_token, data.refresh_token);
		setupOrg(data.organization_id as string);
		return status_code;
	};
	return {
		isLoading,
		isLoggedIn,
		access_token,
		refresh_token,
		organizationId,
		isForgotPassword,
		forgot_password_token,
		account,
		login,
		loginGG,
		logout,
		setupAuth,
		clearLocalStorage,
		forgotPassword,
		verifyCode,
		resetPassword,
		initOrganizationContext,
	};
});
