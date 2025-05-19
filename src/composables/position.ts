import { CacheTTL } from '@/lib/cache-ttl.util.ts';
import { getAllPosition } from '@/services/position.service.ts';
import { useQuery } from '@tanstack/vue-query';

export const usePosition = () => {
	return useQuery({
		queryKey: ['position'],
		queryFn: async () => await getAllPosition({ limit: 100 }),
		staleTime: CacheTTL.days(7),
		retry: false,
	});
};
