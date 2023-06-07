import React, {
  useEffect, useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '@src/contexts/UserContext';
import { UserGamesProvider } from '@src/contexts/UserGamesContext';
import LayoutDesktop from './LayoutDesktop/LayoutDesktop';
import LayoutMobile from './LayoutMobile/LayoutMobile';
import SettingsMenu from './SettingsMenu/SettingsMenu';

export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openMenuSettings, setOpenMenuSettings] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMenuSettings ? 'hidden' : '';
  }, [openMenuSettings]);

  return (
    <UserProvider>
      <UserGamesProvider>
        {openMenuSettings && <SettingsMenu setOpenMenuSetting={setOpenMenuSettings} />}
        {windowWidth > 560 ? (
          <LayoutDesktop setOpenMenuSettings={setOpenMenuSettings}>
            <Outlet />
          </LayoutDesktop>
        ) : (
          <LayoutMobile setOpenMenuSettings={setOpenMenuSettings}>
            <Outlet />
          </LayoutMobile>
        )}
      </UserGamesProvider>
    </UserProvider>
  );
}
