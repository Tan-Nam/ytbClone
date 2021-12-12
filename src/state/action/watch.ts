import {
  createRequestType,
  createAction,
  SUCCESS,
  REQUEST,
  FAILURE,
} from './index';

export const WATCH_DETAIL = createRequestType('WATCH_DETAIL');
export const WATCH_UPDATE = createRequestType('WATCH_UPDATE');

export const watchDetail = {
  request: (videoId: string) =>
    createAction(WATCH_DETAIL[REQUEST], { videoId }),
  success: (response: any) => createAction(WATCH_DETAIL[SUCCESS], { response }),
  failure: (response: any) => createAction(WATCH_DETAIL[FAILURE], { response }),
};

export const updateWatch = {
  request: (data: any) => createAction(WATCH_UPDATE[REQUEST], { data }),
  success: (response: any) => createAction(WATCH_UPDATE[SUCCESS], { response }),
  failure: (response: any) => createAction(WATCH_UPDATE[FAILURE], { response }),
};
