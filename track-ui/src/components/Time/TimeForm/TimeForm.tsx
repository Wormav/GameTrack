import React from 'react';
import { Button, TextField } from '@mui/material';
import { Form } from 'react-router-dom';
import { StyledTextField, StyledTimeForm } from './timeForm.styles';

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
      <h1>Ajoute ton temps de jeu</h1>
      <Form>
        <StyledTextField color="success" type="number" label="Années" variant="filled" />
        <StyledTextField color="success" type="number" label="Mois" variant="filled" />
        <StyledTextField color="success" type="number" label="Jours" variant="filled" />
        <StyledTextField color="success" type="number" label="Heures" variant="filled" />
        <StyledTextField color="success" type="number" label="Minutes" variant="filled" />
      </Form>
    </StyledTimeForm>
  );
}
