import React, { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import axios from '@config/axios.config';
import { useTranslation } from 'react-i18next';
import StyledDiv from './settingsMenu.styles';

export default function SettingsMenu({ setOpenMenuSetting }:
{ setOpenMenuSetting: Dispatch<SetStateAction<boolean>> }) {
  const { t } = useTranslation(['app']);
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

  const handleClickAbout = () => {
    navigate('/about');
  };

  const handleClickPrivacyPolicy = () => {
    navigate('/privacy-policy');
  };

  const handleClickCross = () => {
    setOpenMenuSetting(false);
  };

  return (

    <StyledDiv>
      <IconButton onClick={handleClickProfile}><span>{t('myProfile')}</span></IconButton>
      <IconButton onClick={handleClickLogout}><span>{t('logout')}</span></IconButton>
      <IconButton onClick={handleClickAbout}><span>{t('about')}</span></IconButton>
      <IconButton onClick={handleClickPrivacyPolicy}><span>{t('legalNotice')}</span></IconButton>
      <IconButton onClick={handleClickCross}><ImCross className="cross" /></IconButton>
    </StyledDiv>
  );
}
