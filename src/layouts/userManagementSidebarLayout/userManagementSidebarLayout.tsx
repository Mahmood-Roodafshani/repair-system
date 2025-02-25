import { FC } from 'react';
import SidebarBaseLayout from '../components/SidebarBaseLayout';
import { SidebarLayoutProps } from '../sidebarLayoutProps';
import SidebarWrapper from '../components/SidebarWrapper';
import SidebarMenu from './sidebar';

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  return (
    <SidebarBaseLayout>
      <SidebarWrapper>
        <SidebarMenu />
      </SidebarWrapper>
    </SidebarBaseLayout>
  );
};

export default SidebarLayout;
