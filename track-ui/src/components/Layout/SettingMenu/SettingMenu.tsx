import React, { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import StyledDiv from './settingMenu.styles';
import axios from '../../../config/axios.config';

export default function SettingMenu({ setOpenMenuSetting }:
{ setOpenMenuSetting: Dispatch<SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleClickLogout = () => {
    axios
      .delete(
        '/auth',
        { withCredentials: true },
      )
      .then(() => {
        navigate('/auth/signin');
      });
  };

  const handleClickCross = () => {
    setOpenMenuSetting(false);
  };

  return (

    <StyledDiv>
      <IconButton><span>Mon profil</span></IconButton>
      <IconButton onClick={handleClickLogout}><span>Déconnexion</span></IconButton>
      <IconButton><span>Supprimer mon compte</span></IconButton>
      <IconButton onClick={handleClickCross}><ImCross className="cross" /></IconButton>
    </StyledDiv>
  );
}
