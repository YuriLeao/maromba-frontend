export interface Pageable<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }