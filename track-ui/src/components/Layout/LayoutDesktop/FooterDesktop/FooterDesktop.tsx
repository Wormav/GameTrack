import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import StyledFooter from './footerDesktop.styles';

export default function FooterDesktop() {
  const { t } = useTranslation(['app']);

  const navigate = useNavigate();

  const handleClickLegalNotice = () => {
    navigate('/legal-notice');
  };

  const handleClickPolicy = () => {
    navigate('/privacy-policy');
  };

  const handleClickAbout = () => {
    navigate('/about');
  };

  return (
    <StyledFooter>
      <ul>
        <IconButton onClick={handleClickLegalNotice}>
          <li>
            {t('legalNotice')}
          </li>
        </IconButton>
        <IconButton onClick={handleClickPolicy}>
          <li>{t('policy')}</li>
        </IconButton>
        <IconButton onClick={handleClickAbout}>
          <li>© 2023 Playtracker</li>
        </IconButton>
      </ul>
    </StyledFooter>
  );
}
