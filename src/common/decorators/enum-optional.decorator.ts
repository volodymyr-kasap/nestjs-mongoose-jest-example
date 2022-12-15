import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { IsEnum, IsOptional } from 'class-validator';

import { ToEnumOptional } from '$/common/decorators/class-validator';


export function EnumOptional (
  options: Pick<ApiPropertyOptions, 'enumName' | 'default'> & {
    enum: Record<string, never> | any;
  },
): PropertyDecorator {
  return applyDecorators(
    IsOptional(),
    ToEnumOptional(),
    IsEnum(options.enum),
    ApiPropertyOptional({
      enum: options.enum,
      enumName: options.enumName,
      default: options.default,
    }),
  );
}
