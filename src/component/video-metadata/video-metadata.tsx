import { Divider, Icon } from 'semantic-ui-react';
import { Button } from '..';
import './video-metadata.scss';

export function VideoMetadata(props: any) {
  const { video } = props;

  //
  if (!video || video.length <= 0) {
    return <div />;
  }

  return (
    <div className='video-metadata'>
      {!video ? (
        <></>
      ) : (
        <>
          <h3>{video.snippet.title}</h3>
          <div className='video-stats'>
            <span>100.000 views</span>
            <div className='video-actions'>
              <Button basic='basic' icon='icon-text' size='medium'>
                <Icon name='share' className='icon' />
                Share
              </Button>
              <Button basic='basic' icon='icon' size='medium'>
                <Icon name='add circle' className='icon' />
              </Button>
              <Button basic='basic' icon='icon' size='medium'>
                <Icon name='ellipsis horizontal' className='icon' />
              </Button>
            </div>
          </div>
        </>
      )}
      <Divider />
    </div>
  );
}
