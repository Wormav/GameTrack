import React, { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import axios from '@config/axios.config';
import StyledDiv from './settingsMenu.styles';

export default function SettingsMenu({ setOpenMenuSetting }:
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

  const handleClickProfile = () => {
    navigate('/user-profile');
  };

  const handleClickCross = () => {
    setOpenMenuSetting(false);
  };

  return (

    <StyledDiv>
      <IconButton onClick={handleClickProfile}><span>Mon profil</span></IconButton>
      <IconButton onClick={handleClickLogout}><span>Déconnexion</span></IconButton>
      <IconButton onClick={handleClickCross}><ImCross className="cross" /></IconButton>
    </StyledDiv>
  );
}
