import React from 'react';
import StyledNav from './navbar.styles';
import ButtonProfil from './components/ButtonProfil/ButtonProfil';
import SearchBar from './components/SearchBar/SearchBar';

export default function Navbar() {
  return (
    <StyledNav>
      <ul>
        <li>Accueil</li>
        <li>Mes jeux</li>
        <SearchBar />
        <ButtonProfil />
      </ul>
    </StyledNav>
  );
}
