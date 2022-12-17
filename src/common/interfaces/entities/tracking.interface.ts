import { ITrackingSearchSettings } from './tracking-search-settings.interface';

import { TrackingStatusEnum } from '$/common/enums';


export interface ITracking {
  _id?: string;
  search: string;
  searchSettings: ITrackingSearchSettings;
  status?: TrackingStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
