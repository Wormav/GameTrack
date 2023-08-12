import React from 'react';
import { Button } from '@mui/material';
import StyledTimeForm from './timeForm.styles';

interface TimeFormProps {
  setOpenModal: (value: boolean) => void;
}

export default function TimeForm({ setOpenModal }: TimeFormProps) {
  document.body.style.overflow = 'hidden';

  const handleClick = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <StyledTimeForm>
      <h1>test</h1>
      <Button onClick={handleClick}>ici</Button>
    </StyledTimeForm>
  );
}
