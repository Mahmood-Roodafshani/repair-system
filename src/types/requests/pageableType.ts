export type Pageable<T> = {
  pageSize: number;
  pageIndex: number;
  sort?: object;
  request?: T;
};
