import './video.scss';

const BASE_EMBED_URL = 'https://www.youtube.com/embed/';
export function Video(props: any) {
  const { id } = props;
  return (
    <div className='video-container'>
      <div className='video'>
        <iframe
          className='video-player'
          src={id ? `${BASE_EMBED_URL}${id}` : `https://www.youtube.com/embed/tvLpfycqPqM`}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
        />
      </div>
    </div>
  );
}
