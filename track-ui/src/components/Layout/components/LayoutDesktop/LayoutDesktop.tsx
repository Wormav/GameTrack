import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import StyledDiv from './layoutDesktop.styles';
import FooterDesktop from './components/FooterDesktop/FooterDesktop';

interface LayoutDesktopProps {
  children: ReactNode;
  setOpenMenuSetting: Dispatch<SetStateAction<boolean>>;
}

export default function LayoutDesktop({ children, setOpenMenuSetting }: LayoutDesktopProps) {
  return (
    <>
      <NavbarDesktop setOpenMenuSetting={setOpenMenuSetting} />
      <StyledDiv>
        {children}
      </StyledDiv>
      <FooterDesktop />
    </>
  );
}
