import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../../../config/axios.config';
import {
  StyledButton,
  StyledTextField,
  StyledForm,
  StyledLink,
  StyledGoogle,
  StyledDiscord,
  StyledSpan,
  StyledNotEye,
  StyledEye,
} from '../../auth.styles';
import { schemaFormSignin } from '../../schema/yup';

interface Data {
  pseudo: string;
  email: string;
  password: string;
}

function SignIn() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaFormSignin) });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    axios
      .post(
        '/auth/signin',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        const reponse = res.data;
        setResponseMessage(reponse.message);
      })
      .catch((err) => {
        setResponseMessage(err.response.data.error);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="icon-container">
        <StyledGoogle />
        <StyledDiscord />
      </div>
      <div className="separator-container">
        <div className="rod" />
        <p>ou</p>
        <div className="rod" />
      </div>
      <div className="input-container">
        <StyledTextField
          error={!!errors.email}
          color="success"
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
        <div className="eye-container ">
          <StyledTextField
            error={!!errors.password}
            color="success"
            type={showPassword ? 'text' : 'password'}
            label="Mots de passe"
            autoComplete="current-password"
            variant="filled"
            {...register('password')}
          />
          {showPassword ? <StyledNotEye onClick={() => setShowPassword(!showPassword)} />
            : <StyledEye onClick={() => setShowPassword(!showPassword)} />}
        </div>
        {errors.password && typeof errors.password.message === 'string' && (
          <span role="alert" className="alert">
            {errors.password.message}
          </span>
        )}
      </div>
      {responseMessage && (
        <StyledSpan className="alert">{responseMessage}</StyledSpan>
      )}
      <div>
        <StyledButton variant="contained" type="submit">
          Se connecter
        </StyledButton>
      </div>
      <StyledLink className="link" to="../signup">
        Pas encore de compte ?
      </StyledLink>
    </StyledForm>
  );
}

export default SignIn;
