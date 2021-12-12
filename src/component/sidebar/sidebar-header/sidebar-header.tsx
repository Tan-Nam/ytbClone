import { Menu } from 'semantic-ui-react';

function SidebarHeader(props: any) {
  const { title } = props;

  return (
    <Menu.Item>
      <Menu.Header className='side-bar-header'>{title}</Menu.Header>
    </Menu.Item>
  );
}

export default SidebarHeader;
