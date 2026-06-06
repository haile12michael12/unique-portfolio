import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '@/services/api/comments.api';
import { config } from '@/config/env';
import { queryKeys } from './queryKeys';

export function useCommentsByPost(postId) {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: () => commentsApi.getByPost(postId),
    enabled: config.api.useBackend && Boolean(postId),
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => commentsApi.create(payload),
    onSuccess: (_, variables) => {
      if (variables?.post) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.comments.byPost(variables.post),
        });
      }
    },
  });
}
