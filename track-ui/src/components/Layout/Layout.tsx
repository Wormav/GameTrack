import React, {
  ReactNode, useEffect, useState,
} from 'react';
import LayoutDesktop from './components/LayoutDesktop/LayoutDesktop';
import LayoutMobile from './components/LayoutMobile/LayoutMobile';
import SettingMenu from './SettingMenu/SettingMenu';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children } : LayoutProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openMenuSetting, setOpenMenuSetting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {openMenuSetting && <SettingMenu setOpenMenuSetting={setOpenMenuSetting} />}
      {windowWidth > 480 ? (
        <LayoutDesktop setOpenMenuSetting={setOpenMenuSetting}>
          {children}
        </LayoutDesktop>
      ) : (
        <LayoutMobile setOpenMenuSetting={setOpenMenuSetting}>
          {children}
        </LayoutMobile>
      )}
    </>
  );
}
