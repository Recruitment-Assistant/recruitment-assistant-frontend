import axiosClient from '@/plugins';
import type { IApiResponseV1, IFileResponse } from '@/types';

export const uploadFileApi = async (formData: any): Promise<IApiResponseV1<IFileResponse>> => {
	const { data } = await axiosClient.post('/files', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return data;
};

export const uploadMultiFileApi = async (
	formData: any,
): Promise<IApiResponseV1<IFileResponse[]>> => {
	const { data } = await axiosClient.post('/files/multiple', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return data;
};
