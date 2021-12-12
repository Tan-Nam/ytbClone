import { createRequestType, createAction, REQUEST, SUCCESS, FAILURE } from './index';

//async action
export const COMMENT_LIST = createRequestType('COMMENT_LIST');

export const commentList = {
  request: (videoId: string) => createAction(COMMENT_LIST[REQUEST], { videoId }),
  success: (response: any, videoId: string) => createAction(COMMENT_LIST[SUCCESS], { response, videoId }),
  failure: (response: any) => createAction(COMMENT_LIST[FAILURE], { response }),
};
