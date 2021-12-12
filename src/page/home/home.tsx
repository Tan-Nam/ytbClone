import { useState, useRef } from 'react';
import { Header, Sidebar } from '../../component';
import HomeContent from './home-content/home-content';
import './home.scss';

export function Home() {
  const [acitveSidebar, setActiveSidebar] = useState<Boolean>(true);
  const homeContainer = useRef<HTMLDivElement>(null);

  //
  function handleActiveSidebar() {
    setActiveSidebar(!acitveSidebar);
    if (acitveSidebar) {
      if (homeContainer.current) {
        homeContainer.current.style.paddingLeft = '0';
      }
    } else {
      if (homeContainer.current) {
        homeContainer.current.style.paddingLeft = 'var(--sidebar-left-width)';
      }
    }
  }

  return (
    <div className=''>
      <Header onActiveSidebar={handleActiveSidebar} />
      <div className='home-sidebar'>{acitveSidebar && <Sidebar />}</div>
      <div className='home-container' ref={homeContainer}>
        <HomeContent />
      </div>
    </div>
  );
}
