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

export const switchOrganization = async (organizationId: string): Promise<ITokenResponse> => {
	const { data } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
		`/auth/select-organization`,
		{
			organization_id: organizationId,
		},
	);
	return data?.data;
};

export const createOrganization = async (
	payload: CreateOrganizationPayload,
): Promise<Organization> => {
	const { data } = await axiosClient.post<IApiResponseV1<Organization>>(
		'/organizations',
		payload,
	);
	return data?.data;
};
