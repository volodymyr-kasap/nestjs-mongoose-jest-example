export interface PaginatePageFilterInterface {
  search: string;
  page: number;
  dateFrom: Date;
  dateTo: Date;
  take: number;
  skip: number;
}
