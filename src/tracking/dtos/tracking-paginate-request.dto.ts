import { PaginatePageRequestDto } from '$/common/dto/pages';
import { TrackingStatusEnum } from '$/common/enums';
import { EnumOptional } from '$/common/decorators';
import { TrackingPaginateFilter } from '$/tracking/repositories/filters';


export class TrackingPaginateRequestDto extends PaginatePageRequestDto implements TrackingPaginateFilter{
  @EnumOptional({
    enum: TrackingStatusEnum,
    enumName: 'TrackingStatusEnum',
  })
  status: TrackingStatusEnum;
}
