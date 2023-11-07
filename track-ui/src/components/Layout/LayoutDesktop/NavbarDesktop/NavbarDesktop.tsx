import React, { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchBarDesktop } from '@components/SearchBar/SearchBarDesktop/SearchBarDesktop';
import { useTranslation } from 'react-i18next';
import { StyledLi, StyledNavDesktop } from './navbarDesktop.styles';
import ButtonProfilDesktop from './ButtonProfilDesktop/ButtonProfilDesktop';

export default function NavbarDesktop({ setOpenMenuSettings }:
{ setOpenMenuSettings: Dispatch<SetStateAction<boolean>> }) {
  const { t } = useTranslation(['app']);
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

  const handleClickMyLists = () => {
    navigate('/mylists');
  };

  return (
    <StyledNavDesktop>
      <ul>
        <img className="logo" src="/logo.svg" alt="logo" />
        <StyledLi isActive={location === '/'} onClick={handleClickHome}>{t('home')}</StyledLi>
        <StyledLi isActive={location === '/mygames'} onClick={handleClickMyGames}>{t('my_games')}</StyledLi>
        <StyledLi isActive={location === '/mylists'} onClick={handleClickMyLists}>{t('myLists')}</StyledLi>
      </ul>
      <SearchBarDesktop />
      <ButtonProfilDesktop onClick={handleClick} />
    </StyledNavDesktop>
  );
}
