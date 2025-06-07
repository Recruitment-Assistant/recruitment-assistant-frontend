import { useQuery } from '@tanstack/vue-query';
import { getAllPipeline } from '@/services/pipeline.service.ts';

export const usePipeline = () => {
	return useQuery({
		queryKey: ['pipeline'],
		queryFn: async () => await getAllPipeline(),
		staleTime: 7 * 24 * 60 * 60 * 1000,
		retry: false,
	});
};
