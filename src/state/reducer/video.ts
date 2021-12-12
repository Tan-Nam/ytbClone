import { createSelector } from 'reselect';
import { FAILURE, REQUEST, SUCCESS } from '../action';
import { GET_VIDEO_ID, MOST_POPULAR_ONLINE, CREATE_NEW_VIDEO } from '../action/video';
import { WATCH_DETAIL, WATCH_UPDATE } from '../action/watch';

export const initialState = {
  byId: {},
  mostPopular: [],
  totalPage: -1,
  currentVideo: {},
  isLoading: true,
  hasError: null,
};

export function videoReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case MOST_POPULAR_ONLINE[SUCCESS]:
      return fetchMostPopularVideo(action.response, state);
    case MOST_POPULAR_ONLINE[REQUEST]:
      return resetLoadingState(state);
    case MOST_POPULAR_ONLINE[FAILURE]:
      return handleErrorResponse(action.response, state);
    //
    case WATCH_DETAIL[SUCCESS]:
      return fetchVideoDetail(action.response, state);
    case WATCH_DETAIL[REQUEST]:
      return resetLoadingState(state);
    case WATCH_DETAIL[FAILURE]:
      return handleErrorResponse(action.response, state);
    //
    case WATCH_UPDATE[SUCCESS]:
      return fetchVideoDetail(action.response, state);
    case WATCH_UPDATE[REQUEST]:
      return resetLoadingState(state);
    case WATCH_UPDATE[FAILURE]:
      return handleErrorResponse(action.response, state);
    //
    case CREATE_NEW_VIDEO[REQUEST]:
      return resetLoadingState(state);
    case CREATE_NEW_VIDEO[SUCCESS]:
      return updateVideoList(action.response, state);
    case CREATE_NEW_VIDEO[FAILURE]:
      return handleErrorResponse(action.response, state);
    //
    case GET_VIDEO_ID:
      return filterVideoById(action.videoId, state);
    //
    default:
      return state;
  }
}

function fetchMostPopularVideo(response: any, state: any) {
  const videoList = response.data.reduce((acc: any, video: any) => {
    acc[video.id] = video;
    return acc;
  }, {});
  const item = Object.keys(videoList);

  const totalPage = response.headers['x-total-count'];

  return {
    ...state,
    mostPopular: item,
    byId: { ...state.byId, ...videoList },
    totalPage: totalPage,
    isLoading: false,
    hasError: null,
  };
}

function fetchVideoDetail(response: any, state: any) {
  const videoId = response.data.id;
  return {
    ...state,
    byId: {
      ...state.byId,
      [videoId]: {
        ...response.data,
      },
    },
    currentVideo: { ...state.currentVideo, ...response.data },
    isLoading: false,
    hasError: null,
  };
}

function filterVideoById(videoId: any, state: any) {
  return {
    ...state,
    currentVideo: state.byId[videoId],
    isLoading: false,
    hasError: null,
  };
}

function updateVideoList(response: any, state: any) {
  const newVideoId = response.data.id;
  const newVideoDetail = response.data;
  const newVideo: any = {};
  newVideo[newVideoId] = newVideoDetail;
  return {
    ...state,
    byId: { ...state.byId, ...newVideo },
    mostPopular: [newVideoId, ...state.mostPopular],
    isLoading: false,
    hasError: null,
  };
}

function resetLoadingState(state: any) {
  return {
    ...state,
    isLoading: true,
  };
}

function handleErrorResponse(response: any, state: any) {
  return {
    ...state,
    hasError: JSON.stringify(response.data) || 'not found',
  };
}

// selector
export const getMostPopularVideo = createSelector(
  (state: any) => state.video.byId,
  (state: any) => state.video.mostPopular,
  (state: any) => state.video.totalPage,
  (videoById, mostPopular, totalPage) => {
    if (!mostPopular) {
      return {
        data: [],
        totalPage: 50,
      };
    }
    return {
      data: mostPopular.map((videoId: any) => videoById[videoId]),
      totalPage: parseInt(totalPage),
    };
  }
);

export const getVideoListId = createSelector(
  (state: any) => state.video.mostPopular,
  (videoListId: any) => {
    return videoListId;
  }
);

export const getVideoById = createSelector(
  (state: any) => state.video.currentVideo,
  (videoById) => {
    if (videoById) {
      return videoById;
    }
    return null;
  }
);

export const getLoading = createSelector(
  (state: any) => state.video.isLoading,
  (isLoading) => {
    return isLoading;
  }
);

export const getError = createSelector(
  (state: any) => state.video.hasError,
  (hasError) => {
    return hasError;
  }
);
