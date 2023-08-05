import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useWindowWidth from '@src/hooks/useWindowWidth';
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
    <>
      <Error />
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
    </>
  );
}
