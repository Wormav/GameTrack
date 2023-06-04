import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import StyledDiv from './layoutDesktop.styles';
import FooterDesktop from './components/FooterDesktop/FooterDesktop';

interface LayoutDesktopProps {
  children: ReactNode;
  setOpenMenuSettings: Dispatch<SetStateAction<boolean>>;
}

export default function LayoutDesktop({ children, setOpenMenuSettings }: LayoutDesktopProps) {
  return (
    <>
      <NavbarDesktop setOpenMenuSettings={setOpenMenuSettings} />
      <StyledDiv>
        {children}
      </StyledDiv>
      <FooterDesktop />
    </>
  );
}
