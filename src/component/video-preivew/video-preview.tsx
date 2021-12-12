import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ContentModal } from '../modal/content-modal';
import { useModal } from '../../hook';
import { VideoMetadata } from '../video-metadata/video-metadata';
import { VideoDescription } from '../video-description/video-description';
import { getVideoDurationString } from '../../util/time-format';
import { videoPreviewProp } from '../../model/video-preview-prop';
import './video-preview.scss';

function convertViewCount(viewCount: string): string {
  const formatView = ['N', 'Tr', 'T'];
  const x = Math.floor(viewCount.length / 3);
  let res = viewCount.length % 3 === 0 ? viewCount.slice(0, 3) : viewCount.slice(0, viewCount.length - 3 * x);
  if (viewCount.length % 3) {
    res = res.concat(formatView[Math.floor(viewCount.length / 3) - 1]);
  } else {
    res = res.concat(formatView[Math.floor(viewCount.length / 3) - 2]);
  }

  return res;
}

export function VideoPreview(props: videoPreviewProp) {
  const { video, pathname, videoId, detailPreview } = props;
  const { isShow, toggleModal } = useModal();
  const duration = video.contentDetails ? video.contentDetails.duration : null;
  const horizontal = props.horizontal ? 'horizontal' : null;
  const expanded = props.expanded ? 'expanded' : null;
  const videoDuration = getVideoDurationString(duration);
  const videoURL = pathname.concat(videoId);
  const viewCount = video.statistics ? video.statistics.viewCount : null;
  let viewAndTime = '';
  const modalHeader = <>{video.snippet.title}</>;
  const modalBody = (
    <>
      <div className='modal-body__item'>
        <VideoMetadata video={video} />
      </div>
      <div className='modal-body__item'>
        <VideoDescription video={video} />
      </div>
    </>
  );
  const modalFooter = detailPreview ? (
    <div className='modal-footer__item'>
      <Link to={{ pathname: videoURL }} className='detail-button button'>
        Detail
      </Link>
    </div>
  ) : (
    <></>
  );

  //
  if (viewCount) {
    const viewCountShort = video.statistics.viewCount;
    viewAndTime = `${convertViewCount(viewCountShort)} views • 1 year ago`;
  } else viewAndTime = '';

  return (
    <div className={['video-preview', horizontal, expanded].join(' ')} onClick={toggleModal}>
      <div className='image-container'>
        <div className='image-wrapper'>
          <div className='frame'>
            <Image src={video.snippet.thumbnails.medium.url} className='zoom-out' />
          </div>
        </div>
        <div className='time-label'>
          <span>{videoDuration}</span>
        </div>
      </div>

      <div className='video-info'>
        <div className={['semi-bold', 'show-max-two-lines', expanded].join(' ')}>{video.snippet.title}</div>
        <div className='video-preview-metadata-container'>
          <div className='channel-title'>{video.snippet.channelTitle}</div>
          <div className='view-and-time'>{viewAndTime}</div>
          {expanded && <div className={'show-max-two-lines'}>{video.snippet.description}</div>}
        </div>
      </div>

      <>
        <ContentModal
          isShown={isShow}
          hide={toggleModal}
          headerContent={modalHeader}
          bodyContent={modalBody}
          footerContent={modalFooter}
        />
      </>
    </div>
  );
}
