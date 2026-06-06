import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/services/api/categories.api';
import { config } from '@/config/env';
import { queryKeys } from './queryKeys';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => categoriesApi.getAll(),
    enabled: config.api.useBackend,
    staleTime: 1000 * 60 * 10,
  });
}
