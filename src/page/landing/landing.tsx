import { Link } from 'react-router-dom';
import { Header, Carousel } from '../../component';
import './landing.scss';

export function Landing() {
  return (
    <div>
      <Header />
      <div id='landing-container'>
        <div id='content-container'>
          <h1>Youtube Clone</h1>
          <p>GoTecQ intern's project</p>
          <Link to='/home'>
            <button>Explore</button>
          </Link>
        </div>
        <div id='bg-container'>
          <Carousel />
        </div>
      </div>
    </div>
  );
}
