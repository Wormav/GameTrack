import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '@config/axios.config';
import axios from 'axios';
import { useMutation } from 'react-query';
import { schemaFormSignin } from '@src/utils/yup/schema/yup';

import {
  StyledButton,
  StyledEye,
  StyledForm,
  StyledLink,
  StyledNotEye,
  StyledSpan,
  StyledTextField,
} from './signin.styles';

interface Data {
  email: string;
  password: string;
}

function SignIn() {
  const { t } = useTranslation(['auth', 'user', 'common']);
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const signInMutation = useMutation(async (data: Data) => {
    const response = await axiosConfig.post('/auth/signin', data, { withCredentials: true });
    return response.data;
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaFormSignin) });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    try {
      const response = await signInMutation.mutateAsync(data);
      setResponseMessage(response.message);
      navigate('/');
    } catch (error) {
      if (import.meta.env.DEBUG === 'true') {
        // eslint-disable-next-line no-console
        console.error({ message: 'Signin', error });
      }
      if (axios.isAxiosError(error)) {
        setResponseMessage(error.response?.data.error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} className="form">
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
            label={t('password')}
            autoComplete="current-password"
            variant="filled"
            {...register('password')}
          />
          {showPassword ? (
            <StyledNotEye onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <StyledEye onClick={() => setShowPassword(!showPassword)} />
          )}
        </div>
        {errors.password && typeof errors.password.message === 'string' && (
          <span role="alert" className="alert">
            {errors.password.message}
          </span>
        )}
        {responseMessage && (
        <StyledSpan className="alert">{responseMessage}</StyledSpan>
        )}
        <StyledLink className="link" to="/auth/reset-password">
          {t('forgetPassword')}
        </StyledLink>
      </div>
      <div>
        <StyledButton disabled={signInMutation.isLoading} variant="contained" type="submit">
          {t('connect')}
        </StyledButton>
      </div>
      <StyledLink className="link" to="/auth/signup">
        {t('notRegistered')}
      </StyledLink>
    </StyledForm>
  );
}

export default SignIn;
