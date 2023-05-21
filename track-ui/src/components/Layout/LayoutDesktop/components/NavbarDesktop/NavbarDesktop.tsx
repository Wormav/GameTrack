import React from 'react';
import StyledNavDesktop from './navbarDesktop.styles';
import SearchBarDesktop from './components/SearchBarDesktop/SearchBarDesktop';
import ButtonProfilDesktop from './components/ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop() {
  return (
    <StyledNavDesktop>
      <ul>
        <li>Accueil</li>
        <li>Mes jeux</li>
        <SearchBarDesktop />
        <ButtonProfilDesktop />
      </ul>
    </StyledNavDesktop>
  );
}
