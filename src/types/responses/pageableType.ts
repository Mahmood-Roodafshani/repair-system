export type Pageable<T> = {
  totalCount: number;
  pageSize: number;
  pageIndex: number;
  content: T[];
};
