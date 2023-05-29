import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import NavbarMobile from './NavbarMobile/NavbarMobile';
import BtnMobile from './BtnMobile/BtnMobile';

interface LayoutDesktopProps {
  children: ReactNode;
  setOpenMenuSetting: Dispatch<SetStateAction<boolean>>;
}

export default function LayoutMobile({ children, setOpenMenuSetting }: LayoutDesktopProps) {
  return (
    <>
      <BtnMobile setOpenMenuSetting={setOpenMenuSetting} />
      {children}
      <NavbarMobile />
    </>
  );
}
