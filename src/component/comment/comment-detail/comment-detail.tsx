import { Image, Button } from 'semantic-ui-react';
import './comment-detail.scss';

export function CommentDetail(props: any) {
  const { comment } = props;
  const topLevelComment = props.comment.snippet.topLevelComment;
  const { authorProfileImageUrl, authorDisplayName, textOriginal } = topLevelComment.snippet;
  const likeCount = topLevelComment.snippet.likeCount;

  if (!comment) {
    return <div />;
  }

  return (
    <div className='comment'>
      <Image className='user-image' src={authorProfileImageUrl} circular />
      <div>
        <div className='user-name'>{authorDisplayName}</div>
        <span>{textOriginal}</span>
        <div className='comment-actions'>
          {/* <Button size='mini' compact>
            REPLY
          </Button> */}
        </div>
      </div>
    </div>
  );
}
