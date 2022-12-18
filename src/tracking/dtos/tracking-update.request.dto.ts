import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TrackingSearchSettingsRequestDto } from './tracking-search-settings-request.dto';


export class TrackingUpdateRequestDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => TrackingSearchSettingsRequestDto)
  searchSettings: TrackingSearchSettingsRequestDto;
}
