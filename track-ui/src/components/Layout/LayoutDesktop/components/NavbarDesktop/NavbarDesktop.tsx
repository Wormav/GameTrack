import React from 'react';
import StyledNav from './navbarDesktop.styles';
import SearchBarDesktop from './components/SearchBarDesktop/SearchBarDesktop';
import ButtonProfilDesktop from './components/ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop() {
  return (
    <StyledNav>
      <ul>
        <li>Accueil</li>
        <li>Mes jeux</li>
        <SearchBarDesktop />
        <ButtonProfilDesktop />
      </ul>
    </StyledNav>
  );
}
