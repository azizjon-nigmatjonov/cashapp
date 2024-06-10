export const usePaginationCount = (count, limit) => {
  if (!count) return 1;
  return count > limit ? Math.ceil(count / limit) : 1;
};
