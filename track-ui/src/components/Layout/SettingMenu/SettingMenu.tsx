import React, { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import { ImCross } from 'react-icons/im';
import StyledDiv from './settingMenu.styles';

export default function SettingMenu({ setOpenMenuSetting }:
{ setOpenMenuSetting: Dispatch<SetStateAction<boolean>> }) {
  const handleClickCross = () => {
    setOpenMenuSetting(false);
  };

  return (

    <StyledDiv>
      <IconButton><span>Mon profil</span></IconButton>
      <IconButton><span>Déconnexion</span></IconButton>
      <IconButton><span>Supprimer mon compte</span></IconButton>
      <IconButton onClick={handleClickCross}><ImCross className="cross" /></IconButton>
    </StyledDiv>
  );
}
