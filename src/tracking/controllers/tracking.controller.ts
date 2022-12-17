import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageDto } from '$/common/dto/pages';
import { TrackingService } from '$/tracking/services';
import {
  TrackingCreateRequestDto,
  TrackingPaginateRequestDto, TrackingResponseDto,
  TrackingUpdateRequestDto,
  TrackingUpdateStatusRequestDto,
} from '$/tracking/dtos';
import { ParseObjectIdPipe } from '$/common/pipes';


@Controller('tracking')
@ApiTags('tracking')
export class TrackingController {
  constructor (
    private readonly service: TrackingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated' })
  async getPaginated (
    @Query() request: TrackingPaginateRequestDto,
  ): Promise<PageDto<TrackingResponseDto>> {
    return this.service.getPaginate(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  async getOne (
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<TrackingResponseDto> {
    return this.service.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create tracking' })
  async create (
    @Body() body: TrackingCreateRequestDto,
  ): Promise<TrackingResponseDto> {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update' })
  async update (
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: TrackingUpdateRequestDto,
  ): Promise<TrackingResponseDto> {
    return this.service.update(id, body);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update status' })
  async updateStatus (
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: TrackingUpdateStatusRequestDto,
  ): Promise<TrackingResponseDto> {
    return this.service.updateStatus(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  @ApiNoContentResponse()
  async delete (
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<void> {
    await this.service.delete(id);
  }
}
