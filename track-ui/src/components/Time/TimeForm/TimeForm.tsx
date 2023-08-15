import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaFormAddTime } from '@src/pages/Auth/schema/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '@config/axios.config';
import { convertTimeToHowLongTime } from '@src/utils/convertFormatsTime';
import { ErrorContext } from '@src/contexts/ErrorContext';
import { StyledButton, StyledTextField, StyledTimeForm } from './timeForm.styles';

interface TimeFormProps {
  setOpenModal: (value: boolean) => void;
  gameId: number;
}

interface Data {
  hours: number;
  minutes: number;
}

export default function TimeForm({ setOpenModal, gameId }: TimeFormProps) {
  document.body.style.overflow = 'hidden';

  const [noDataError, setNoDataError] = useState('');

  const { setError } = useContext(ErrorContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaFormAddTime) });

  const handleClickCancel = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };

  const onSubmit: SubmitHandler<Data> = async (data) => {
    if (data.hours === null && data.minutes === null) {
      setNoDataError('Veuillez renseigner au moins un champ');
    } else if (data.hours === 0 && data.minutes === 0) {
      setNoDataError('Vous ne pouvez pas renseigner 0h et 0min');
    } else {
      axios.post(
        `/user/game/${gameId}/time`,
        {
          time: {
            mainStory: convertTimeToHowLongTime(data.hours, data.minutes),
          },
        },
        { withCredentials: true },
      ).then(() => {
        setOpenModal(false);
        document.body.style.overflow = 'visible';
      })
        .catch((err) => {
          setOpenModal(false);
          // eslint-disable-next-line no-console
          console.log(err);
          setError(true);
        });
    }
  };

  return (
    <StyledTimeForm>
      <div className="container">
        <h1>Ajoute ton temps de jeu !</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            color="success"
            type="number"
            label="Heures"
            variant="filled"
            {...register('hours')}
            error={!!errors.hours}
          />
          {errors.hours && typeof errors.hours.message === 'string' && (
            <span role="alert" className="alert">
              {errors.hours.message}
            </span>
          )}
          <StyledTextField
            color="success"
            type="number"
            label="Minutes"
            variant="filled"
            {...register('minutes')}
            error={!!errors.minutes}
          />
          {errors.minutes && typeof errors.minutes.message === 'string' && (
            <span role="alert" className="alert">
              {errors.minutes.message}
            </span>
          )}
          <div className="button-container">
            <StyledButton variant="contained" type="submit">Valider</StyledButton>
            <StyledButton onClick={handleClickCancel} variant="contained" $background>Annuler</StyledButton>
          </div>
          {noDataError && <span role="alert" className="alert">{noDataError}</span>}
        </Form>
      </div>
    </StyledTimeForm>
  );
}
