import { fork, take } from 'redux-saga/effects';
import * as watchAction from '../action/watch';
import { REQUEST } from '../action';
import { Query } from '../../access/api/query-api';
import { Command } from '../../access/api/command-api';
import { fetchEntity } from './index';
//worker
export function* fetchVideoDetail(videoId: string) {
  const request = Query.video.item;
  const param = videoId;
  yield fetchEntity(request, param, watchAction.watchDetail);
}

export function* putVideoUpdated(data: any) {
  const request = Command.trending.update;
  const param = data;
  yield fetchEntity(request, param, watchAction.updateWatch);
}

//wathcer

export function* watchVideoDetail() {
  while (true) {
    const { videoId } = yield take(watchAction.WATCH_DETAIL[REQUEST]);
    yield fork(fetchVideoDetail, videoId);
  }
}

export function* watchUpdateVideoDetail() {
  while (true) {
    const { data } = yield take(watchAction.WATCH_UPDATE[REQUEST]);
    yield fork(putVideoUpdated, data);
  }
}
