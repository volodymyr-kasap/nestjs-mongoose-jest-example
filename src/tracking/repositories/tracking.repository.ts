import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '$/common/repositories/base.repository';
import { TrackingModel } from '$/tracking/models';


@Injectable()
export class TrackingRepository extends BaseMongoRepository<TrackingModel> {
  constructor (
    @InjectModel(TrackingModel.name) private readonly model: Model<TrackingModel>,
  ) {
    super(model);
  }
}
