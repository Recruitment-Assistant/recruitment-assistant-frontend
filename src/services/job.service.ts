import type { IApiResponseV1 } from '@/types';
import axiosClient from '@/plugins';
import type { IJobFilter, Job } from '@/types/jobs/job.ts';
import { JOB_API } from '@/constants/api/job.api.ts';
import { createApiEndpoint } from '@/lib/utils.ts';
import type { JobPayloadType } from '@/types/jobs/job.schema.ts';

export const getAllJobs = async (filter?: IJobFilter) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<Job[]>>(JOB_API.BASE, {
		params: filter,
	});
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const createJob = async (payload: JobPayloadType) => {
	const { data, status } = await axiosClient.post(JOB_API.BASE, payload);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const updateJob = async (id: string, payload: JobPayloadType) => {
	const { data, status } = await axiosClient.put(createApiEndpoint(JOB_API.BY_ID, id), payload);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const deleteJob = async (id: string) => {
	const { data, status } = await axiosClient.delete(createApiEndpoint(JOB_API.BY_ID, id));
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const uploadApplicantForJob = async (job_id: string, file: File) => {
	const formData = new FormData();
	formData.append('file', file);

	const { data, status } = await axiosClient.post(
		createApiEndpoint(JOB_API.UPLOAD_APPLICANT_FOR_JOB, job_id),
		formData,
	);

	if (status >= 400) {
		throw new Error();
	}

	return data;
};
