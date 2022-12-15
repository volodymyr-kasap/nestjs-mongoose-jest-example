import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackingModel, TrackingSchema } from '$/tracking/models';
import { TrackingController } from '$/tracking/controllers';
import { TrackingService } from '$/tracking/services';
import { TrackingRepository } from '$/tracking/repositories';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrackingModel.name, schema: TrackingSchema },
    ]),
  ],
  controllers: [
    TrackingController,
  ],
  providers: [
    TrackingRepository,
    TrackingService,
  ],
})
export class TrackingModule {}