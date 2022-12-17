import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class TrackingSearchSettingsModel extends Document {
  @Prop({
    default: false,
  })
  inChannels: boolean;

  @Prop({
    default: false,
  })
  inChats: boolean;
}

export const TrackingSearchSettingsSchema = SchemaFactory.createForClass(TrackingSearchSettingsModel);
