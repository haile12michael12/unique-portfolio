import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blog.service';
import { queryKeys } from './queryKeys';

export function usePosts(params = {}) {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => blogService.getAllPosts(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePost(slug) {
  return useQuery({
    queryKey: queryKeys.posts.bySlug(slug),
    queryFn: () => blogService.getPostBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => blogService.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });
}
