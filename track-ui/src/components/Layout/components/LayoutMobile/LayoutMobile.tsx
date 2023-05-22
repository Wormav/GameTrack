import React, { ReactNode } from 'react';
import NavbarMobile from './NavbarMobile/NavbarMobile';
import BtnMobile from './BtnMobile/BtnMobile';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutMobile({ children } : LayoutProps) {
  return (
    <>
      <BtnMobile />
      {children}
      <NavbarMobile />
    </>
  );
}
