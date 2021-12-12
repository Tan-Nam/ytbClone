import { Menu, Divider } from 'semantic-ui-react';
import SidebarItem from './sidebar-item/sidebar-item';
import SidebarHeader from './sidebar-header/sidebar-header';
import SibarFooter from './sidebar-footer/sidebar-footer';
import './sidebar.scss';

export function Sidebar() {
  return (
    <Menu borderless vertical stackable fixed='left' className='side-nav'>
      <SidebarItem pathname='/home' label='Home' icon='home' />
      <SidebarItem pathname='/trending' label='Trending' icon='fire' />
      <SidebarItem pathname='/home' label='Followers' icon='spy' />
      <Divider />
      <SidebarHeader title='Library' />
      <SidebarItem pathname='/home' label='History' icon='history' />
      <SidebarItem pathname='/home' label='Watch later' icon='clock' />
      <SidebarItem pathname='/home' label='Liked videos' icon='thumbs up' />
      <Divider />
      <SidebarHeader title='More from Youtube' />
      <SidebarItem pathname='/home' label='Movies and Shows' icon='film' />
      <Divider />
      <SidebarItem pathname='/home' label='Report history' icon='flag' />
      <SidebarItem pathname='/home' label='Help' icon='help circle' />
      <SidebarItem pathname='/home' label='Send feedback' icon='comment' />
      <Divider />
      <SibarFooter />
    </Menu>
  );
}
