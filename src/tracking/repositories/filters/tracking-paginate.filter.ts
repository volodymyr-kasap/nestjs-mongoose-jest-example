import { PaginatePageFilterInterface } from '$/common/interfaces/filters';
import { TrackingStatusEnum } from '$/common/enums';


export interface TrackingPaginateFilter extends PaginatePageFilterInterface {
  status?: TrackingStatusEnum;
}
