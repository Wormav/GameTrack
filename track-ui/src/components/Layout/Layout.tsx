import React, { ReactNode } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StyledDiv from './layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children } : LayoutProps) {
  return (
    <>
      <Navbar />
      <StyledDiv />
      {children}
      <Footer />
    </>
  );
}
