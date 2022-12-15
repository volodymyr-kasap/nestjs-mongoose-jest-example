import { PaginatePageRequestDto } from '$/common/dto/pages';
import { TrackingStatusEnum } from '$/common/enums';
import { EnumOptional } from '$/common/decorators';


export class TrackingPaginateRequestDto extends PaginatePageRequestDto {
  @EnumOptional({
    enum: TrackingStatusEnum,
    enumName: 'TrackingStatusEnum',
  })
  status: TrackingStatusEnum;
}
