import React, { ReactNode } from 'react';
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import StyledDiv from './layoutDesktop.styles';
import FooterDesktop from './components/FooterDesktop/FooterDesktop';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutDesktop({ children } : LayoutProps) {
  return (
    <>
      <NavbarDesktop />
      <StyledDiv>
        {children}
      </StyledDiv>
      <FooterDesktop />
    </>
  );
}
