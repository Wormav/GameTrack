import React, { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBarDesktop from '@components/SearchBar/SearchBarDesktop/SearchBarDesktop';
import { StyledLi, StyledNavDesktop } from './navbarDesktop.styles';
import ButtonProfilDesktop from './ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop({ setOpenMenuSettings }:
{ setOpenMenuSettings: Dispatch<SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleClick = () => {
    setOpenMenuSettings(true);
  };

  const handleClickHome = () => {
    navigate('/');
  };

  const handleClickMyGames = () => {
    navigate('/mygames');
  };

  return (
    <StyledNavDesktop>
      <ul>
        <img className="logo" src="/logo.png" alt="logo" />
        <StyledLi isActive={location === '/'} onClick={handleClickHome}>Accueil</StyledLi>
        <StyledLi isActive={location === '/mygames'} onClick={handleClickMyGames}>Mes jeux</StyledLi>
      </ul>
      <SearchBarDesktop />
      <ButtonProfilDesktop onClick={handleClick} />
    </StyledNavDesktop>
  );
}
