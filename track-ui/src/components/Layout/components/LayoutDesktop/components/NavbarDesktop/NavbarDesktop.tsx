import React from 'react';
import { useLocation } from 'react-router-dom';
import { StyledLi, StyledNavDesktop } from './navbarDesktop.styles';
import SearchBarDesktop from './components/SearchBarDesktop/SearchBarDesktop';
import ButtonProfilDesktop from './components/ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop() {
  const location = useLocation().pathname;

  return (
    <StyledNavDesktop>
      <ul>
        <img src="/logo.png" alt="logo" />
        <StyledLi isActive={location === '/'}>Accueil</StyledLi>
        <StyledLi>Mes jeux</StyledLi>
        <SearchBarDesktop />
        <ButtonProfilDesktop />
      </ul>
    </StyledNavDesktop>
  );
}
