import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '@src/contexts/ErrorContext';
import Emoji from '@components/Emoji/Emoji';
import { useTranslation } from 'react-i18next';
import StyledContainer from './error.styles';

export default function Error() {
  const { t } = useTranslation(['app']);
  const navigate = useNavigate();

  const { setError, error } = useContext(ErrorContext);

  if (error) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  const handleClickIconButton = () => {
    setError(false);
    navigate('/');
  };

  if (error) {
    return (
      <StyledContainer>
        <Emoji emoji="🥺" label="sad smiley" />
        <span>{t('errorOccured')}</span>
        <IconButton onClick={handleClickIconButton}><ImCross className="cross" /></IconButton>
      </StyledContainer>
    );
  }

  return null;
}
