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
    window.scrollTo(0, 0);
  };

  const handleClickMyGames = () => {
    navigate('/mygames');
    window.scrollTo(0, 0);
  };

  const handleClickMyLists = () => {
    navigate('/mylists');
    window.scrollTo(0, 0);
  };

  return (
    <StyledNavDesktop>
      <ul>
        <img className="logo" src="/logo.png" alt="logo" />
        <StyledLi isActive={location === '/'} onClick={handleClickHome}>Accueil</StyledLi>
        <StyledLi isActive={location === '/mygames'} onClick={handleClickMyGames}>Mes jeux</StyledLi>
        <StyledLi isActive={location === '/mylists'} onClick={handleClickMyLists}>Mes listes</StyledLi>
      </ul>
      <SearchBarDesktop />
      <ButtonProfilDesktop onClick={handleClick} />
    </StyledNavDesktop>
  );
}
