import { uppdateApplicationStageApi } from './../services/application.service';
import type { IFilterApplication } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { getApplicationApi, getApplicationByIdApi } from '@/services/application.service.ts';
import { DATA_TIME } from '@/constants';
import { computed, type Ref } from 'vue';

export const useApplication = (filter?: Partial<IFilterApplication>) => {
	return useQuery({
		queryKey: ['application', filter?.stage_id, filter],
		queryFn: async () => await getApplicationApi(filter),
		retry: false,
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetApplicationById = (id: Ref<string | undefined>) => {
	return useQuery({
		queryKey: ['application', id],
		queryFn: async () => await getApplicationByIdApi(id.value as string),
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled: computed(() => !!id.value),
		gcTime: DATA_TIME.DELETE,
	});
};

export const useUpdateApplicationStage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { id: string; stageId: string }) =>
			await uppdateApplicationStageApi(payload.id, payload.stageId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['application'],
			});
		},
	});
};
