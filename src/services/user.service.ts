import axiosClient from '@/plugins';
import type { IApiResponseV1, User } from '@/types';
import { USER_API } from '@/constants/api/user.api.ts';

export const getUserApi = async () => {
	const { data } = await axiosClient.get<IApiResponseV1<User>>(USER_API.CURRENT_USER);
	return data;
};
