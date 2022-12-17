import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseMongoRepository } from '$/common/repositories/base.repository';
import { TrackingModel } from '$/tracking/models';
import { TrackingPaginateFilter } from '$/tracking/repositories/filters';


@Injectable()
export class TrackingRepository extends BaseMongoRepository<TrackingModel> {
  constructor (
    @InjectModel(TrackingModel.name) private readonly model: Model<TrackingModel>,
  ) {
    super(model);
  }

  async findPaginate (filter: TrackingPaginateFilter): Promise<[TrackingModel[], number]> {
    const condition: FilterQuery<TrackingModel> = {
      ...(filter.status) && { status: filter.status },
    };

    const total = await this.model.count(condition).exec();

    const models = await this.entityModel.find(condition)
      .limit(filter.take)
      .skip(filter.skip)
      .sort({ createdAt: filter.sortBy })
      .exec();

    return [models, total];
  }
}
