
export interface DataResult<T> {
  total: number;
  items: T[];
}

export const defaultOffset = 0;
export const maxLimit = 100;

export interface PageQueries {
  offset: number;
  limit: number;
}

export type SortOrder = 'DESC' | 'ASC';
