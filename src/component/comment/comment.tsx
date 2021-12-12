import { useEffect } from 'react';
import * as commentAction from '../../state/action/comment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentForVideo } from '../../state/reducer/comment';
import { CommentDetail } from './comment-detail/comment-detail';
import { CommentHeader } from './comment-header/comment-header';

export function Comment(props: any) {
  const { videoId } = props;
  const commentList = useSelector(getCommentForVideo);

  const dispatch = useDispatch();

  //
  useEffect(() => {
    dispatch(commentAction.commentList.request(videoId));
  }, [videoId]);

  if (!commentList) {
    return <>no data... </>;
  }
  const comment = commentList?.map((commentDetail: any) => {
    return <CommentDetail comment={commentDetail} key={commentDetail.id} />;
  });

  return (
    <div>
      <CommentHeader amountComments={commentList.length} />
      {comment}
    </div>
  );
}
