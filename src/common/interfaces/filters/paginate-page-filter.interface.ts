import { SortOrderEnum } from '$/common/enums';


export interface PaginatePageFilterInterface {
  search: string;
  page: number;
  dateFrom: Date;
  dateTo: Date;
  take: number;
  skip: number;
  sortBy: SortOrderEnum;
}
