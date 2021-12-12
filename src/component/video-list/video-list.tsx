import { VideoPreview } from '../video-preivew/video-preview';
import './video-list.scss';
export function VideoList(props: any) {
  const { video } = props;

  //
  if (!video || !video.length) {
    return null;
  }

  return (
    <div className='video-list'>
      {video.map((item: any) => (
        <VideoPreview
          key={item.id}
          video={item}
          pathname='/watch/'
          videoId={item.id}
          horizontal={true}
          expanded={true}
          detailPreview={true}
        />
      ))}
    </div>
  );
}
