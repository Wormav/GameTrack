import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledLi, StyledNavDesktop } from './navbarDesktop.styles';
import SearchBarDesktop from './components/SearchBarDesktop/SearchBarDesktop';
import ButtonProfilDesktop from './components/ButtonProfilDesktop/ButtonProfilDesktop';
import SettingMenu from '../../../../SettingMenu/SettingMenu';

export default function NavbarDesktop() {
  const location = useLocation().pathname;
  const [openMenuSetting, setOpenMenuSetting] = useState(false);

  const handleClick = () => {
    setOpenMenuSetting(true);
  };

  return (
    <StyledNavDesktop>
      <ul>
        <img src="/logo.png" alt="logo" />
        <StyledLi isActive={location === '/'}>Accueil</StyledLi>
        <StyledLi>Mes jeux</StyledLi>
        <SearchBarDesktop />
        <ButtonProfilDesktop onClick={handleClick} />
        {openMenuSetting && <SettingMenu />}
      </ul>
    </StyledNavDesktop>
  );
}
