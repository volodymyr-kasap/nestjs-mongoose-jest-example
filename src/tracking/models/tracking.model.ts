import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TrackingStatusEnum } from '$/common/enums';


@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class TrackingModel extends Document {
  @Prop({
    required: true,
    enum: TrackingStatusEnum,
    type: String,
    default: TrackingStatusEnum.ACTIVE,
  })
  status: TrackingStatusEnum;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingModel);
