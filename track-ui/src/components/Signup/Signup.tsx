import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from '@config/axios.config';
import { schemaFormSignup } from '@src/utils/yup/schema/yup';
import { useTranslation } from 'react-i18next';
import {
  StyledButton, StyledEye, StyledForm, StyledLink, StyledNotEye, StyledSpan, StyledTextField,
} from './signup.styles';

interface Data {
  pseudo : string
  email : string
  password : string
  passwordConfirmation : string
}

export interface PasswordCondition {
  label: string,
  valid: boolean
}

function SignUp() {
  const { t } = useTranslation(['auth', 'user', 'common']);
  const [responseMessage, setResponseMessage] = useState(null);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState<PasswordCondition[]>([
    { label: t('formCondition.minCharacter'), valid: false },
    { label: t('formCondition.atLeastOneMaj'), valid: false },
    { label: t('formCondition.atLeastOneNumber'), valid: false },
    { label: t('formCondition.atLeastOneSpecialCharacter'), valid: false },
  ]);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaFormSignup) });

  const validatePassword = (password: string) => {
    setPasswordConditions([
      { label: t('formCondition.minCharacter'), valid: password.length >= 8 },
      { label: t('formCondition.atLeastOneMaj'), valid: /[A-Z]/.test(password) },
      { label: t('formCondition.atLeastOneNumber'), valid: /\d/.test(password) },
      { label: t('formCondition.atLeastOneSpecialCharacter'), valid: /[^A-Za-z0-9]/.test(password) },
    ]);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    validatePassword(password);
  };

  const onSubmit: SubmitHandler<Data> = async (data) => {
    axios.put(
      '/auth/signup',
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
          error={!!errors.pseudo}
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
          error={!!errors.email}
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
        <div className="eye-container ">
          <StyledTextField
            error={!!errors.password}
            color="success"
            className="input"
            type={showPassword ? 'text' : 'password'}
            label={t('password')}
            autoComplete="current-password"
            variant="filled"
            {...register('password')}
            onFocus={() => setPasswordInputFocus(true)}
            onChange={handlePasswordChange}
          />
          {showPassword ? <StyledNotEye onClick={() => setShowPassword(!showPassword)} />
            : <StyledEye onClick={() => setShowPassword(!showPassword)} />}
        </div>
        {passwordInputFocus || errors.password ? (
          <div className="password-requirements">
            <p>Le mot de passe doit contenir au moins :</p>
            <ul className="password-conditions">
              {passwordConditions.map((condition) => (
                <li key={condition.label} className={condition.valid ? 'check' : ''}>
                  {condition.label}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="input-container">
        <div className="eye-container ">
          <StyledTextField
            error={!!errors.password}
            color="success"
            className="input"
            type={showPassword ? 'text' : 'password'}
            label={t('confirmPassword')}
            autoComplete="current-password"
            variant="filled"
            {...register('passwordConfirmation')}
          />
          {showPassword ? <StyledNotEye onClick={() => setShowPassword(!showPassword)} />
            : <StyledEye onClick={() => setShowPassword(!showPassword)} />}
        </div>
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
      <StyledLink className="link" to="/auth/signin">{t('back')}</StyledLink>
    </StyledForm>
  );
}

export default SignUp;
