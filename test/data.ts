import { TrackingCreateRequestDto } from '$/tracking/dtos';


export namespace Tracking {
  export const validCreateRequest: TrackingCreateRequestDto = {
    search: `search-${Date.now()}`,
    searchSettings: {
      inChats: true,
      inChannels: true,
    },
  };

  export const emptyCreateRequest = {};

  export const emptySearchSettingsCreateRequest = {
    search: `search-${Date.now()}`,
    searchSettings: {},
  };

  export const emptySearchStrCreateRequest: TrackingCreateRequestDto = {
    search: '',
    searchSettings: {
      inChannels: true,
      inChats: false,
    },
  };

  export const longSpacesSearchStrCreateRequest: TrackingCreateRequestDto = {
    search: Array.from({ length: 999 }).fill(' ').join('') + Date.now(),
    searchSettings: {
      inChannels: true,
      inChats: false,
    },
  };

  export const longSearchStrCreateRequest: TrackingCreateRequestDto = {
    search: Array.from({ length: 999 }).fill('9').join(''),
    searchSettings: {
      inChannels: true,
      inChats: false,
    },
  };

  export const createRequestWithoutSettings: Omit<TrackingCreateRequestDto, 'searchSettings'> = {
    search: `search-${Date.now()}`,
  };

  export const createRequestWithoutSearch: Omit<TrackingCreateRequestDto, 'search'> = {
    searchSettings: {
      inChannels: true,
      inChats: true,
    },
  };

  export const nonUniqCreateRequest: TrackingCreateRequestDto = {
    search: 'search',
    searchSettings: {
      inChannels: true,
      inChats: false,
    },
  };

  export const notFoundObjectId = '507f1f77bcf86cd799439011';
  export const unvalidObjectId = '1';
}
