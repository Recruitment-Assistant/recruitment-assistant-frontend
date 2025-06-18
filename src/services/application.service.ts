import type { IApiResponseV1, IApplication, IFilterApplication } from '@/types';
import axiosClient from '@/plugins';
import { APPLICATION_API } from '@/constants/api/application.api.ts';
import { createApiEndpoint } from '@/lib/utils.ts';

export const getApplicationApi = async (
	filter?: IFilterApplication,
): Promise<IApiResponseV1<IApplication[]>> => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplication[]>>(
		APPLICATION_API.BASE,
		{
			params: filter,
		},
	);
	if (status >= 400) {
		throw new Error();
	}

	return data;
};

export const getApplicationByIdApi = async (
	applicationId: string,
): Promise<IApiResponseV1<IApplication>> => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplication>>(
		createApiEndpoint(APPLICATION_API.BY_ID, applicationId),
	);
	if (status >= 400) {
		throw new Error();
	}

	return data;
};

export const uppdateApplicationStageApi = async (applicationId: string, stageId: string) => {
	const { data, status } = await axiosClient.patch(
		createApiEndpoint(APPLICATION_API.UPDATE_STAGE, applicationId),
		{ stage_id: stageId },
	);

	if (status >= 400) {
		throw new Error();
	}
	return data;
};
