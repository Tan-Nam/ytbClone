import { Icon, Image, Menu, SemanticICONS } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './header-nav.scss';

type Prop = {
  onActiveSidebar?: () => void;
};

export function Header({ onActiveSidebar }: Prop) {
  function handleClickMenu() {
    if (onActiveSidebar) {
      onActiveSidebar();
    }
  }
  return (
    <Menu borderless className='header-nav'>
      {/* 2 */}
      <Menu.Menu className='nav-left'>
        <Menu.Item>
          <Icon className='header-icon' name='list' size='large' onClick={() => handleClickMenu()} />
        </Menu.Item>
        <Menu.Item header className='logo'>
          <Link to='/'>
            <Image
              src='https://www.pngitem.com/pimgs/m/246-2468229_2000px-youtube-logo-svg-youtube-api-logo-png.png'
              size='tiny'
            />
          </Link>
        </Menu.Item>
      </Menu.Menu>

      {/* 3 */}
      <Menu.Menu className='nav-center'>
        {/* <Menu.Item className="search-input">
          <Form>
            <Form.Field>
              <Input placeholder="Search" size="small" action="Go" />
            </Form.Field>
          </Form>
        </Menu.Item> */}
      </Menu.Menu>

      {/* 5 */}
      <Menu.Menu className='nav-right'>
        {['video camera', 'grid layout', 'chat', 'alarm'].map((entry) => {
          return (
            <Menu.Item key={entry}>
              <Icon className='header-icon' name={entry as SemanticICONS | undefined} size='large' />
            </Menu.Item>
          );
        })}
        {/* 7*/}
        <Menu.Item name='avatar'>
          <Image src='https://via.placeholder.com/80x80' avatar />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
