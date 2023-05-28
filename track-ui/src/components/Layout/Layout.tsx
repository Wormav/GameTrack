import React, { ReactNode, useEffect, useState } from 'react';
import LayoutDesktop from './components/LayoutDesktop/LayoutDesktop';
import LayoutMobile from './components/LayoutMobile/LayoutMobile';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children } : LayoutProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    windowWidth > 480 ? (
      <LayoutDesktop>
        {children}
      </LayoutDesktop>
    ) : (
      <LayoutMobile>
        {children}
      </LayoutMobile>
    )
  );
}
