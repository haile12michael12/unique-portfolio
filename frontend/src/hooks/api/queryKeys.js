export const queryKeys = {
  posts: {
    all: ['posts'],
    list: (params) => ['posts', 'list', params],
    detail: (id) => ['posts', 'detail', id],
    bySlug: (slug) => ['posts', 'slug', slug],
  },
  categories: {
    all: ['categories'],
    detail: (id) => ['categories', 'detail', id],
  },
  comments: {
    all: ['comments'],
    byPost: (postId) => ['comments', 'post', postId],
  },
  users: {
    profile: ['users', 'profile'],
  },
};

export default queryKeys;
