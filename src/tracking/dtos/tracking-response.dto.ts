import { Expose, Type } from 'class-transformer';

import { TrackingStatusEnum } from '$/common/enums';
import { TransformMongoId } from '$/common/decorators/class-transformer';


class TrackingSearchSettings {
  @Expose() inChannels: boolean;

  @Expose() inChats: boolean;
}

export class TrackingResponseDto {
  @TransformMongoId()
  @Expose() _id: string;

  @Expose() search: string;

  @Expose() createdAt: Date;

  @Expose() status: TrackingStatusEnum;

  @Type(() => TrackingSearchSettings)
  @Expose() searchSettings: TrackingSearchSettings;
}
