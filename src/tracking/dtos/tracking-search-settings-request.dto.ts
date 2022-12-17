import { IsBoolean, IsOptional } from 'class-validator';


export class TrackingSearchSettingsRequestDto {
  @IsBoolean()
  @IsOptional()
  inChannels: boolean;

  @IsBoolean()
  @IsOptional()
  inChats: boolean;
}
