import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import StyledDiv from './layoutDesktop.styles';
import FooterDesktop from './FooterDesktop/FooterDesktop';
import NavbarDesktop from './NavbarDesktop/NavbarDesktop';

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
