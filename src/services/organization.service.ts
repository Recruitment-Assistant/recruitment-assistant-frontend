import axiosClient from '@/plugins';
import type {
	CreateOrganizationPayload,
	IApiResponseV1,
	ITokenResponse,
	Organization,
} from '@/types';

export const getMyOrganization = async (): Promise<Organization[]> => {
	const { data } = await axiosClient.get<IApiResponseV1<Organization[]>>(`/organizations`);
	return data.data;
};

export const createOrganizationApi = async (
	payload: CreateOrganizationPayload,
): Promise<IApiResponseV1<ITokenResponse>> => {
	const { data } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
		'/organizations',
		payload,
	);
	return data;
};
