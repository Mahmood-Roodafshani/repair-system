export type Pageable<T> = {
  pageSize: number;
  pageIndex: number;
  request?: T;
};
