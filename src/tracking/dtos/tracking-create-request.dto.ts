import { IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TrackingSearchSettingsRequestDto } from './tracking-search-settings-request.dto';

import { TrimString } from '$/common/decorators/class-transformer';


export class TrackingCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @TrimString()
  search: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => TrackingSearchSettingsRequestDto)
  searchSettings: TrackingSearchSettingsRequestDto;
}
