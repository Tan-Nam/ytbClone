import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as videoAction from '../../state/action/video';
import { getMostPopularVideo, getError } from '../../state/reducer/video';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { responseVideo } from '../../model/video';
import './carousel.scss';

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const videoList: any = useSelector(getMostPopularVideo);
  const hasError: any = useSelector(getError);
  var image_list: Array<any> = videoList.data;
  const length = videoList.data.length || 0;
  const skeleton = videoList.data.length > 0 ? '' : 'skeleton';
  const dispatch = useDispatch();

  //
  useEffect(() => {
    const fetchVideo = () => {
      dispatch(videoAction.mostPopularOnline.request({ _page: 1, _limit: 5 }));
      if (hasError) {
        toast.error(hasError);
      }
    };
    fetchVideo();
  }, [dispatch, hasError]);

  //
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  //
  if (image_list.length > 0) {
    image_list = image_list.map((item: responseVideo) => {
      return item.snippet.thumbnails.medium.url;
    });
  }

  return (
    <div className='slider-container'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      <div className={['slider-image', skeleton].join(' ')}>
        {(image_list ?? []).map((slide_item, index) => {
          return (
            <div key={index} className={index === current ? 'slide active' : 'slide'}>
              {index === current && <img src={slide_item} alt='video' className='image' />}
            </div>
          );
        })}
        <ToastContainer />
        {hasError && <> no data...</>}
      </div>
    </div>
  );
}
