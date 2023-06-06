import React, {
  useEffect, useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import LayoutDesktop from './components/LayoutDesktop/LayoutDesktop';
import LayoutMobile from './components/LayoutMobile/LayoutMobile';
import SettingMenu from './SettingsMenu/SettingMenu';

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
    if (openMenuSettings) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openMenuSettings]);

  return (
    <>
      {openMenuSettings && <SettingMenu setOpenMenuSetting={setOpenMenuSettings} />}
      {windowWidth > 480 ? (
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
