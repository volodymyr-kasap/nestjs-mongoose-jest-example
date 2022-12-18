import { IsDefined, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TrackingSearchSettingsRequestDto } from './tracking-search-settings-request.dto';

import { TrimString } from '$/common/decorators/class-transformer';


export class TrackingCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @TrimString()
  @MaxLength(128)
  search: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => TrackingSearchSettingsRequestDto)
  searchSettings: TrackingSearchSettingsRequestDto;
}
