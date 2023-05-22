import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledLi, StyledNavDesktop } from './navbarDesktop.styles';
import SearchBarDesktop from './components/SearchBarDesktop/SearchBarDesktop';
import ButtonProfilDesktop from './components/ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop() {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);
  return (
    <StyledNavDesktop>
      <ul>
        <StyledLi isActive={currentUrl === '/'}>Accueil</StyledLi>
        <StyledLi>Mes jeux</StyledLi>
        <SearchBarDesktop />
        <ButtonProfilDesktop />
      </ul>
    </StyledNavDesktop>
  );
}
