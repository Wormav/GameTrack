import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '@src/contexts/UserContext';
import { UserGamesProvider } from '@src/contexts/UserGamesContext';
import useWindowWidth from '@src/hooks/useWindowWidth';
import { ErrorProvider } from '@src/contexts/ErrorContext';
import Error from '@components/Error/Error';
import LayoutDesktop from './LayoutDesktop/LayoutDesktop';
import LayoutMobile from './LayoutMobile/LayoutMobile';
import SettingsMenu from './SettingsMenu/SettingsMenu';

export default function Layout() {
  const windowWidth = useWindowWidth();

  const [openMenuSettings, setOpenMenuSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenuSettings ? 'hidden' : '';
  }, [openMenuSettings]);

  return (
    <ErrorProvider>
      <Error />
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
    </ErrorProvider>
  );
}
