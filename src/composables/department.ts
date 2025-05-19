import { useQuery } from '@tanstack/vue-query';
import { getAllDepartment } from '@/services/department.service.ts';

export const useDepartment = () => {
	return useQuery({
		queryKey: ['department'],
		queryFn: async () => await getAllDepartment({ limit: 100 }),
		staleTime: 7 * 24 * 60 * 60 * 1000,
		retry: false,
	});
};
