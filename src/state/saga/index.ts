import { all, put, fork, call } from 'redux-saga/effects';
import { watchMostPopularVideo, watchCreateNewVideo } from './video';
import { watchVideoDetail, watchUpdateVideoDetail } from './watch';
import { watchCommentList } from './comment';
import { ResponseGenerator } from '../../model/common';

export default function* () {
  yield all([
    fork(watchMostPopularVideo),
    fork(watchVideoDetail),
    fork(watchUpdateVideoDetail),
    fork(watchCreateNewVideo),
    fork(watchCommentList),
  ]);
}

export function* fetchEntity(request: any, param: any, entity: any, ...args: any) {
  try {
    const response: ResponseGenerator = yield call(request, param);
    yield put(entity.success(response, ...args));
  } catch (error) {
    yield put(entity.failure(error, ...args));
  }
}
