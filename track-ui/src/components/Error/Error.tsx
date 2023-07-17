import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '@src/contexts/ErrorContext';
import StyledContainer from './error.styles';

export default function Error() {
  const navigate = useNavigate();

  document.body.style.overflow = 'hidden';

  const { setError, error } = useContext(ErrorContext);

  const handleClickIconButton = () => {
    setError(false);
    navigate('/');
  };

  if (error) {
    return (
      <StyledContainer>
        <h1>🥺</h1>
        <span>Une erreur est survenue !</span>
        <IconButton onClick={handleClickIconButton}><ImCross className="cross" /></IconButton>
      </StyledContainer>
    );
  }

  return null;
}
