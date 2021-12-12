import { SUCCESS, FAILURE, REQUEST } from '../action';
import { createSelector } from 'reselect';
import { COMMENT_LIST } from '../action/comment';

const initialState = {
  byVideo: [],
  isLoading: true,
  hasError: null,
};

export function commentReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case COMMENT_LIST[SUCCESS]:
      return fetchCommentList(action.response, action.videoId, state);
    case COMMENT_LIST[REQUEST]:
      return resetLoadingState(state);
    case COMMENT_LIST[FAILURE]:
      return handleErrorResponse(action.response, state);
    default:
      return state;
  }
}

function fetchCommentList(response: any, videoId: any, state: any) {
  if (!response) {
    return state;
  }
  // const commentList = response.data.items.reduce((acc: any, item: any) => {
  //   acc[item.id] = item;
  //   return acc;
  // }, {});
  const commentList = response.data.items;

  return {
    ...state,
    byVideo: commentList,
  };
}

function handleErrorResponse(response: any, state: any) {
  return {
    ...state,
    hasError: JSON.stringify(response),
  };
}

function resetLoadingState(state: any) {
  return {
    ...state,
    isLoading: true,
  };
}
//selector

export const getCommentForVideo = createSelector(
  (state: any) => state.comment.byVideo,
  (commentList: any) => {
    return commentList;
  }
);
