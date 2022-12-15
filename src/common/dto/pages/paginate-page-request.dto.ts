import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';

import { PaginatePageFilterInterface } from '$/common/interfaces/filters';
import { PAGINATION } from '$/common/constants';
import { SortOrderEnum } from '$/common/enums';
import { EnumOptional } from '$/common/decorators';


export class PaginatePageRequestDto implements PaginatePageFilterInterface {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  get take (): number {
    return PAGINATION.DEFAULT;
  }

  get skip (): number {
    return ((this.page - 1) * this.take) || 0;
  }

  @IsOptional()
  @Transform(
    ({ value }) => (value?.length && DateTime.fromISO(value.slice(0, 10)).isValid)
      ? DateTime.fromISO(value.slice(0, 10)).startOf('day').toJSDate()
      : undefined,
  )
  @ApiPropertyOptional()
  dateFrom: Date = undefined;

  @IsOptional()
  @Transform(
    ({ value }) => (value?.length && DateTime.fromISO(value.slice(0, 10)).isValid)
      ? DateTime.fromISO(value.slice(0, 10)).endOf('day').toJSDate()
      : undefined,
  )
  @ApiPropertyOptional()
  dateTo: Date = undefined;

  @EnumOptional({
    enum: SortOrderEnum,
    enumName: 'SortOrderEnum',
    default: SortOrderEnum.DESC,
  })
  orderBy: SortOrderEnum = SortOrderEnum.DESC;
}
