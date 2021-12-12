import { Image } from 'semantic-ui-react';
import { VideoGridHeader } from '../video-grid/video-grid-header/video-grid-header';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import './slider.scss';
export function Slider(props: any) {
  const { title, videos } = props;
  if (!videos || !videos.length) {
    return <div />;
  }

  const trending_video = videos?.map((video: any) => {
    return video.snippet.thumbnails;
  });

  return (
    <>
      <VideoGridHeader title={title} />
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        className='mySwiper'
      >
        {trending_video.map((image: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Image src={image.high.url}></Image>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
