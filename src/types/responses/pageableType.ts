export type Pageable<T> = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
};
