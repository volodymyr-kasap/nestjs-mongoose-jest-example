import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageDto } from '$/common/dto/pages';


@Controller('tracking')
@ApiTags('tracking')
export class TrackingController {

  @Get()
  @ApiOperation({ summary: 'Get paginated' })
  async getPaginated (
    @Query() request,
  ): Promise<PageDto<{}>> {
    return new PageDto<{}>();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  async getOne (): Promise<{}> {
    return {};
  }

  @Post()
  @ApiOperation({ summary: 'Create' })
  async create (
    @Body() body,
  ): Promise<{}> {
    return {};
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update' })
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ): Promise<{}> {
    return {};
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update status' })
  async updateStatus (
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ): Promise<{}> {
    return {};
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  async delete (
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{}> {
    return {};
  }


}
