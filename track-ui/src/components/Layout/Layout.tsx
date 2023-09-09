import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UserProvider } from '@src/contexts/UserContext';
import { UserGamesProvider } from '@src/contexts/UserGamesContext';
import useWindowWidth from '@src/hooks/useWindowWidth';
import { ErrorProvider } from '@src/contexts/ErrorContext';
import Error from '@components/Error/Error';
import { UserListsProvider } from '@src/contexts/UserLists.context';
import LayoutDesktop from './LayoutDesktop/LayoutDesktop';
import LayoutMobile from './LayoutMobile/LayoutMobile';
import SettingsMenu from './SettingsMenu/SettingsMenu';

export default function Layout() {
  const windowWidth = useWindowWidth();
  const location = useLocation();
  const [openMenuSettings, setOpenMenuSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenuSettings ? 'hidden' : '';
  }, [openMenuSettings]);

  useEffect(() => {
    setOpenMenuSettings(false);
  }, [location.pathname]);

  return (
    <ErrorProvider>
      <Error />
      <UserProvider>
        <UserGamesProvider>
          <UserListsProvider>
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
          </UserListsProvider>
        </UserGamesProvider>
      </UserProvider>
    </ErrorProvider>
  );
}
