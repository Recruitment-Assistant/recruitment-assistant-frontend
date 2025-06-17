import { useCustomToast } from '@/lib/customToast.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { IJobFilter, JobPayloadType } from '@/types';
import {
	createJobApi,
	deleteJobApi,
	getAllJobApi,
	updateJobApi,
	updateJobStatusApi,
} from '@/services/job.service.ts';
import type { JOB_STATUS } from '@/constants/job.constant.ts';
import { DATA_TIME } from '@/constants';
import type { Ref } from 'vue';

export const useCreateJob = (filter: Ref<IJobFilter>) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: JobPayloadType) => await createJobApi(payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});

			queryClient.invalidateQueries({
				queryKey: ['job', filter],
			});
		},
		onError: () => {
			return;
		},
	});
};

export const useJob = (filter: Ref<IJobFilter>) => {
	return useQuery({
		queryKey: ['job', filter],
		queryFn: async () => await getAllJobApi(filter.value),
		retry: false,
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useUpdateJob = (filter: Ref<IJobFilter>) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { id: string; payload: JobPayloadType }) =>
			await updateJobApi(data.id, data.payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: ['job', filter],
			});
		},
	});
};

export const useUpdateJobStatus = (filter: Ref<IJobFilter>) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { id: string; status: string }) =>
			await updateJobStatusApi(data.id, data.status as JOB_STATUS),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: ['job', filter],
			});
		},
	});
};

export const useDeleteJob = (filter: Ref<IJobFilter>) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteJobApi(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: ['job', filter],
			});
		},
	});
};
