import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  TrackingModel, TrackingSchema,
  TrackingSearchSettingsModel, TrackingSearchSettingsSchema,
} from '$/tracking/models';
import { TrackingController } from '$/tracking/controllers';
import { TrackingService } from '$/tracking/services';
import { TrackingRepository } from '$/tracking/repositories';
import { TrackingSeed } from '$/tracking/seeds';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrackingModel.name, schema: TrackingSchema },
      { name: TrackingSearchSettingsModel.name, schema: TrackingSearchSettingsSchema },
    ]),
  ],
  controllers: [
    TrackingController,
  ],
  providers: [
    TrackingRepository,
    TrackingService,
    TrackingSeed,
  ],
})
export class TrackingModule {}
