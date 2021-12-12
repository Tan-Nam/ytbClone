import { Button, Icon } from 'semantic-ui-react';
import './comment-header.scss';

export function CommentHeader(props: any) {
  const { amountComments } = props;
  return (
    <div className='comments-header'>
      <h4>{amountComments} Comments</h4>
      <Icon name='align left' />
      Sort by
    </div>
  );
}
