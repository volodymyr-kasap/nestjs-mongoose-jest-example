import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TrackingSearchSettingsSchema, TrackingSearchSettingsModel } from './tracking-search-settings.model';

import { TrackingStatusEnum } from '$/common/enums';
import { ITracking } from '$/common/interfaces/entities';


@Schema({
  timestamps: { createdAt: 'createdAt' },
})
export class TrackingModel extends Document implements ITracking {
  @Prop({
    required: true,
    unique: true,
    maxlength: 128,
  })
  search: string;

  @Prop({
    required: true,
    enum: TrackingStatusEnum,
    type: String,
    default: TrackingStatusEnum.ACTIVE,
  })
  status: TrackingStatusEnum;

  @Prop({
    type: TrackingSearchSettingsSchema,
    required: true,
  })
  searchSettings: TrackingSearchSettingsModel;

  @Prop()
  createdAt: Date;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingModel);
