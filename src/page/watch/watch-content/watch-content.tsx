import { useState, useEffect } from 'react';
import {
  Video,
  VideoMetadata,
  VideoInfoBox,
  Loader,
  TrendingUpdateForm,
  RelatedVideo,
  Comment,
} from '../../../component/index';
import { Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import * as videoAction from '../../../state/action/video';
import * as watchAction from '../../../state/action/watch';
import { getVideoById, getMostPopularVideo, getLoading, getError } from '../../../state/reducer/video';
import { toast, ToastContainer } from 'react-toastify';
import './watch-content.scss';

function WatchContent(props: any) {
  const { videoId } = props;
  const [videoInformation, setVideoInformation] = useState(null);
  const [channelId, setChannelId] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();
  const videoDetail: any = useSelector(getVideoById);
  const videoList: any = useSelector(getMostPopularVideo);
  const isLoading: boolean = useSelector(getLoading);
  const hasError: any = useSelector(getError);

  //fetch video
  useEffect(() => {
    let relevant = true;
    const fetchVideo = () => {
      try {
        if (videoList.data.length < 1) {
          dispatch(watchAction.watchDetail.request(videoId));
        } else {
          dispatch(videoAction.getVideoById.request(videoId));
        }
        const response = videoDetail;
        if (response && Object.keys(response).length > 0 && relevant) {
          setVideoInformation(response);
          setChannelId(response.snippet.channelId);
        }
      } catch (error) {
        toast.error(JSON.stringify('something wrong'));
      }
      return function cleanup() {
        relevant = false;
      };
    };
    fetchVideo();
  }, [JSON.stringify(videoDetail), videoId]);

  function toggleForm() {
    setIsShowing(!isShowing);
  }

  function closeModal() {
    setIsShowing(false);
  }

  return (
    <div className='watch-grid'>
      {isLoading || !videoInformation ? (
        <div className='loader'>
          <Loader />
        </div>
      ) : (
        <>
          <Video className='video' id={videoId} />
          <VideoMetadata className='metadata' video={videoInformation} />
          {channelId.length < 1 ? (
            <>no data...</>
          ) : (
            <VideoInfoBox className='video-info-box' video={videoInformation} channelId={channelId} />
          )}
          <RelatedVideo />
          <div className='comment'>
            <Comment videoId={videoId} />
          </div>

          <div className='position-fixed add-button'>
            <Icon name='pencil alternate' size='large' className=' add-button__icon' onClick={toggleForm}></Icon>
          </div>
        </>
      )}
      {hasError && <>no data... </>}
      <ToastContainer />
      <TrendingUpdateForm
        videoInformation={videoInformation}
        isShowing={isShowing}
        hide={toggleForm}
        closeModal={closeModal}
      />
    </div>
  );
}

export default WatchContent;
