import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/services/api/users.api';
import { config } from '@/config/env';
import { queryKeys } from './queryKeys';

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.users.profile,
    queryFn: () => usersApi.getProfile(),
    enabled: config.api.useBackend,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => usersApi.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => usersApi.register(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => usersApi.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.users.profile });
    },
  });
}
