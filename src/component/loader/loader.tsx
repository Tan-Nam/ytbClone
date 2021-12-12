import './loader.scss';

export function Loader() {
  return (
    <div className='loader-container'>
      <img
        className='loader-spinner'
        src='http://www.myeurostarscity.com/templates/cadenas/myeurostarscity/imagenes/home/loader.gif'
        alt='Spinner'
        width='30'
        height='30'
      />
    </div>
  );
}
