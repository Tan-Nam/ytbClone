import { useState, useEffect } from 'react';
import { VideoPreview } from '../video-preivew/video-preview';
import { Loader } from '../loader/loader';
import { responseVideo } from '../../model/video';
import { Query } from '../../access/api/query-api';
import './related-video.scss';

export function RelatedVideo() {
  const [relateVideo, setRelateVideo] = useState<Array<responseVideo>>();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  let relatedVideosPreviews: any = [];

  //
  useEffect(() => {
    let relevant = true;
    const fetchRelateVideo = async () => {
      try {
        const response: any = await Query.trending.list({
          _page: 1,
          _limit: 25,
        });
        if (relevant && response) {
          setRelateVideo(response.data);
          setIsloading(false);
        }
      } catch (error) {
        if (relevant) {
          setHasError(true);
        }
      }
    };
    fetchRelateVideo();
    return () => {
      relevant = false;
    };
  }, []);

  if (relateVideo) {
    relatedVideosPreviews = relateVideo.map((relatedVideo: any) => (
      <VideoPreview
        key={relatedVideo.id}
        video={relatedVideo}
        pathname='/watch/'
        videoId={relatedVideo.id}
        horizontal={true}
        detailPreview={true}
      />
    ));
  }

  return (
    <div className='related-video'>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>{relatedVideosPreviews} </>
      )}
      {hasError && <>no data...</>}
    </div>
  );
}
