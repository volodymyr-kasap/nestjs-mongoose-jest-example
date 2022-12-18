import { IsBoolean } from 'class-validator';


export class TrackingSearchSettingsRequestDto {
  @IsBoolean()
  inChannels: boolean;

  @IsBoolean()
  inChats: boolean;
}
