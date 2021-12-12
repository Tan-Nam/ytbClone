import { useState, useRef } from 'react';
import { useParams } from 'react-router';
import WatchContent from './watch-content/watch-content';
import { Header, Sidebar } from '../../component/index';
import './watch.scss';

export function Watch() {
  const { videoId }: any = useParams();
  const [acitveSidebar, setActiveSidebar] = useState<Boolean>(true);
  const watchContainer = useRef<HTMLHeadingElement>(null);

  //
  function handleActiveSidebar() {
    setActiveSidebar(!acitveSidebar);
    if (acitveSidebar) {
      if (watchContainer.current) {
        watchContainer.current.style.paddingLeft = '0';
      }
    } else {
      if (watchContainer.current) {
        watchContainer.current.style.paddingLeft = 'var(--sidebar-left-width)';
      }
    }
  }

  //
  if (!videoId) {
    return <div />;
  }

  return (
    <div>
      <Header onActiveSidebar={handleActiveSidebar} />
      <div className='watch-container'>
        <Sidebar />
        <WatchContent videoId={videoId} />
      </div>
    </div>
  );
}
