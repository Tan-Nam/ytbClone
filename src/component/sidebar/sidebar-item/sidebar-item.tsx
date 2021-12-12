import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
function SidebarItem(props: any) {
  const { pathname, label, icon } = props;
  return (
    <Link to={pathname}>
      <Menu.Item className='sidebar-item'>
        <div className='sidebar-item-alignment-container'>
          <span>
            <Icon size='large' name={icon} />{' '}
          </span>
          <span>{label}</span>
        </div>
      </Menu.Item>
    </Link>
  );
}

export default SidebarItem;
