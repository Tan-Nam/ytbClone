import { fork, take } from 'redux-saga/effects';
import { REQUEST } from '../action';
import * as commentAction from '../action/comment';
import { Query } from '../../access/api';
import { fetchEntity } from './index';

//worker

export function* fetchCommentList(videoId: string) {
  const request = Query.comment.list;
  const param = videoId;
  yield fetchEntity(request, param, commentAction.commentList);
}

//wathcer

export function* watchCommentList() {
  while (true) {
    const { videoId } = yield take(commentAction.COMMENT_LIST[REQUEST]);
    yield fork(fetchCommentList, videoId);
  }
}
