import { Injectable } from '@nestjs/common';

import { TrackingRepository } from '$/tracking/repositories';


@Injectable()
export class TrackingSeed {
  constructor (
    private readonly repository: TrackingRepository,
  ) {}

  async createMany () {
    await Promise.all(
      Array.from({ length: 50 }).fill('_').map(async (_, index) => {
        await this.repository.create({
          search: `search-${Date.now()}-${index}`,
          searchSettings: {
            inChannels: true,
            inChats: true,
          },
        });
      }),
    );
  }
}
