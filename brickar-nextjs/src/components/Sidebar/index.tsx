'use client';

import Image from 'next/image';
import Link from 'next/link';

import ClickOutside from '@/components/ClickOutside';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import useLocalStorage from '@/hooks/useLocalStorage';

import {
  // AuthenticationIcon,
  // CalendarIcon,
  // ChartIcon,
  DashboardIcon,
  FormsIcon,
  ProfileIcon,
  RightArrow,
  SettingsIcon,
  // TableIcon,
} from './SidebarIcons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: 'MENU',
    menuItems: [
      {
        icon: <DashboardIcon />,
        label: 'Dashboard',
        route: '/',
      },
      {
        icon: <ProfileIcon />,
        label: 'Manage Users',
        route: '#',
        children: [
          { label: 'Users', route: '/user' },
          { label: 'UnApproved Users', route: '/user/unapproved' },
        ],
      },

      {
        icon: <FormsIcon />,
        label: 'Master Section',
        route: '#',
        children: [
          { label: 'Work Types', route: '/work-type' },
          { label: 'Qualification', route: '/qualification' },
        ],
      },
      {
        icon: <SettingsIcon />,
        label: 'Material Section',
        route: '#',
        children: [
          { label: 'Form Elements', route: '/forms/form-elements' },
          { label: 'Form Layout', route: '/forms/form-layout' },
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard');

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
          <Link href="/">
            <Image
              width={176}
              height={32}
              src={'/images/logo/logo.svg'}
              alt="Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <RightArrow />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 p-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
