import React, { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledLi, StyledNavDesktop } from './navbarDesktop.styles';
import SearchBarDesktop from './components/SearchBarDesktop/SearchBarDesktop';
import ButtonProfilDesktop from './components/ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop({ setOpenMenuSettings }:
{ setOpenMenuSettings: Dispatch<SetStateAction<boolean>> }) {
  const location = useLocation().pathname;

  const handleClick = () => {
    setOpenMenuSettings(true);
  };

  return (
    <StyledNavDesktop>
      <ul>
        <img className="logo" src="/logo.png" alt="logo" />
        <StyledLi isActive={location === '/'}>Accueil</StyledLi>
        <StyledLi>Mes jeux</StyledLi>
        <SearchBarDesktop />
        <ButtonProfilDesktop onClick={handleClick} />
      </ul>
    </StyledNavDesktop>
  );
}
