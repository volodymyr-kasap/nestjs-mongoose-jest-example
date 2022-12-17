import { IsEnum } from 'class-validator';

import { TrackingStatusEnum } from '$/common/enums';


export class TrackingUpdateStatusRequestDto {
  @IsEnum(TrackingStatusEnum)
  status: TrackingStatusEnum;
}
