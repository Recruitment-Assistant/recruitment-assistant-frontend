import type { IApiResponseV1, Pipeline } from '@/types';
import axiosClient from '@/plugins';
import { PIPELINE_API } from '@/constants/api/pipeline.api.ts';

export const getAllPipeline = async (): Promise<IApiResponseV1<Pipeline[]>> => {
	const { data, status } = await axiosClient.get<IApiResponseV1<Pipeline[]>>(PIPELINE_API.BASE);
	return data;
};
