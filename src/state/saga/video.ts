import { fork, take, takeLatest } from 'redux-saga/effects';
import * as videoAction from '../action/video';
import { REQUEST } from '../action';
import { Query } from '../../access/api/index';
import { Command } from '../../access/api/command-api';
import { fetchEntity } from './index';

//worker
export function* fetchMostPopularVideo(filter?: any) {
  const request = Query.trending.list;
  const param = filter.filter;
  yield fetchEntity(request, param, videoAction.mostPopularOnline);
}

export function* postNewVideo(data: any) {
  const request = Command.trending.add;
  const param = data;
  yield fetchEntity(request, param, videoAction.createNewVideo);
}

//watchcer
export function* watchMostPopularVideo() {
  yield takeLatest(videoAction.MOST_POPULAR_ONLINE[REQUEST], fetchMostPopularVideo);
}

export function* watchCreateNewVideo() {
  while (true) {
    const { data } = yield take(videoAction.CREATE_NEW_VIDEO[REQUEST]);
    yield fork(postNewVideo, data);
  }
}
