import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  StyledButton, StyledTextField, StyledForm, StyledLink, StyledSpan,
} from '../../auth.styles';
import { schemaFormSignup } from '../../schema/yup';

interface Data {
  pseudo : string
  email : string
  password : string
  passwordConfirmation : string
}

function SignUp() {
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaFormSignup) });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    axios.put(
      `${import.meta.env.VITE_API_URL}/api/auth/signup`,
      {
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
      },
      { withCredentials: true },
    ).then(() => {
      navigate('/auth/signin');
    })
      .catch((err) => {
        setResponseMessage(err.response.data);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="input-container">
        <StyledTextField
          error={!!errors.password}
          color="success"
          className="input"
          type="text"
          label="Pseudo"
          autoComplete="current-name"
          variant="filled"
          {...register('pseudo')}
        />
        {errors.pseudo && typeof errors.pseudo.message === 'string' && (
        <span role="alert" className="alert">
          {errors.pseudo.message}
        </span>
        )}
      </div>
      <div className="input-container">
        <StyledTextField
          error={!!errors.password}
          color="success"
          className="input"
          type="text"
          label="Email"
          autoComplete="current-email"
          variant="filled"
          {...register('email')}
        />
        {errors.email && typeof errors.email.message === 'string' && (
        <span role="alert" className="alert">
          {errors.email.message}
        </span>
        )}
      </div>
      <div className="input-container">
        <StyledTextField
          error={!!errors.password}
          color="success"
          className="input"
          type="password"
          label="Mots de passe"
          autoComplete="current-password"
          variant="filled"
          {...register('password')}
        />
        {errors.password && typeof errors.password.message === 'string' && (
        <span role="alert" className="alert">
          {errors.password.message}
        </span>
        )}
      </div>
      <div className="input-container">
        <StyledTextField
          error={!!errors.password}
          color="success"
          className="input"
          type="password"
          label="Confirmer le mot de passe"
          autoComplete="current-password"
          variant="filled"
          {...register('passwordConfirmation')}
        />
        {errors.passwordConfirmation && typeof errors.passwordConfirmation.message === 'string' && (
        <span role="alert" className="alert">
          {errors.passwordConfirmation.message}
        </span>
        )}
      </div>
      {responseMessage && (
      <StyledSpan role="alert" className="alert">{responseMessage}</StyledSpan>
      )}
      <div>
        <StyledButton className="btn" variant="contained" type="submit">
          {'s\'inscrire'}
        </StyledButton>
      </div>
      <StyledLink className="link" to="../signin">Retour</StyledLink>
    </StyledForm>
  );
}

export default SignUp;
