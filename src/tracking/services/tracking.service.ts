import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { TrackingRepository } from '$/tracking/repositories';
import {
  TrackingCreateRequestDto,
  TrackingResponseDto,
  TrackingUpdateRequestDto,
  TrackingUpdateStatusRequestDto,
  TrackingPaginateRequestDto,
} from '$/tracking/dtos';
import { TrackingSearchSettingsModel } from '$/tracking/models';
import { PageMapper } from '$/common/mapper';
import { PageDto } from '$/common/dto/pages';


@Injectable()
export class TrackingService {
  constructor (
    private readonly repository: TrackingRepository,
  ) {}

  async getPaginate (request: TrackingPaginateRequestDto): Promise<PageDto<TrackingResponseDto>> {
    const [list, total] = await this.repository.findPaginate(request);
    const dtos = plainToInstance(TrackingResponseDto, list, { excludeExtraneousValues: true });

    return PageMapper.toPageDto<TrackingResponseDto>(dtos, request, total);
  }

  async getOne (id: string): Promise<TrackingResponseDto> {
    const tracking = await this.repository.findOneById(id);

    if (!tracking) {
      throw new NotFoundException('tracking');
    }

    return plainToInstance(TrackingResponseDto, tracking, { excludeExtraneousValues: true });
  }

  async create ({ search, searchSettings }: TrackingCreateRequestDto): Promise<TrackingResponseDto> {
    const isTrackingExist = await this.repository.findOneBy({ search });

    if (isTrackingExist) {
      throw new BadRequestException('tracking is exist');
    }

    const tracking = await this.repository.create({
      search,
      searchSettings,
    });

    return plainToInstance(TrackingResponseDto, tracking, { excludeExtraneousValues: true });
  }

  async update (_id: string, { searchSettings }: TrackingUpdateRequestDto): Promise<TrackingResponseDto> {
    const tracking = await this.repository.findOneById(_id);

    if (!tracking) {
      throw new BadRequestException('tracking is not exist');
    }

    const updatedTracking = await this.repository.findOneAndUpdate({ _id }, {
      searchSettings: {
        inChannels: searchSettings.inChannels,
        inChats: searchSettings.inChats,
      } as TrackingSearchSettingsModel,
    });

    return plainToInstance(TrackingResponseDto, updatedTracking, { excludeExtraneousValues: true });
  }

  async updateStatus (_id: string, { status }: TrackingUpdateStatusRequestDto): Promise<TrackingResponseDto> {
    const tracking = await this.repository.findOneById(_id);

    if (!tracking) {
      throw new BadRequestException('tracking is not exist');
    }

    const updatedTracking = await this.repository.findOneAndUpdate({ _id }, {
      status,
    });

    return plainToInstance(TrackingResponseDto, updatedTracking, { excludeExtraneousValues: true });
  }

  async delete (_id: string): Promise<void> {
    const tracking = await this.repository.findOneById(_id);

    if (!tracking) {
      throw new BadRequestException('tracking is not exist');
    }

    await this.repository.deleteMany({ _id });
  }
}
