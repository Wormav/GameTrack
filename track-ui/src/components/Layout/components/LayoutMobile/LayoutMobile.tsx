import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import NavbarMobile from './NavbarMobile/NavbarMobile';
import BtnMobile from './BtnMobile/BtnMobile';

interface LayoutDesktopProps {
  children: ReactNode;
  setOpenMenuSettings: Dispatch<SetStateAction<boolean>>;
}

export default function LayoutMobile({ children, setOpenMenuSettings }: LayoutDesktopProps) {
  return (
    <>
      <BtnMobile setOpenMenuSettings={setOpenMenuSettings} />
      {children}
      <NavbarMobile />
    </>
  );
}
