import type { IApiResponseV1, ITokenResponse } from '@/types';
import axiosClient from '@/plugins';
import { AUTH_API } from '@/constants/api/auth.api.ts';

export const loginApi = async (payload: {
	email: string;
	password: string;
}): Promise<IApiResponseV1<ITokenResponse>> => {
	const { data } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
		AUTH_API.LOGIN,
		payload,
	);
	return data;
};

export const loginGGApi = async (access_token: string): Promise<IApiResponseV1<ITokenResponse>> => {
	const { data } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(AUTH_API.LOGIN_GG, {
		access_token,
	});
	return data;
};
