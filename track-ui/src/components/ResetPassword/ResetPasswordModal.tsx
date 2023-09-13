import { yupResolver } from '@hookform/resolvers/yup';
import { schemaResetPasswordUpdate } from '@src/utils/yup/schema/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import axios from '@config/axios.config';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { PasswordCondition } from '../Signup/Signup';
import {
  StyledAction,
  StyledButton,
  StyledEye, StyledForm, StyledNotEye, StyledResetPasswordModal, StyledTextField,
} from './resetpasswordmodal.styles';

interface ResetPasswordModalProps {
  openRequested: boolean;
  setOpenRequested: (openRequested: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  email: string;
}

export default function ResetPasswordModal({
  openRequested,
  setOpenRequested,
  setErrorMessage,
  email,
}: ResetPasswordModalProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(['auth', 'user', 'common']);
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState<PasswordCondition[]>([
    { label: t('formCondition.minCharacter'), valid: false },
    { label: t('formCondition.atLeastOneMaj'), valid: false },
    { label: t('formCondition.atLeastOneNumber'), valid: false },
    { label: t('formCondition.atLeastOneSpecialCharacter'), valid: false },
  ]);

  const resetPasswordConditions = () => {
    setPasswordConditions(
      [
        { label: t('formCondition.minCharacter'), valid: false },
        { label: t('formCondition.atLeastOneMaj'), valid: false },
        { label: t('formCondition.atLeastOneNumber'), valid: false },
        { label: t('formCondition.atLeastOneSpecialCharacter'), valid: false },
      ],
    );
  };

  const validatePassword = (password: string) => {
    setPasswordConditions([
      { label: t('formCondition.minCharacter'), valid: password.length >= 8 },
      { label: t('formCondition.atLeastOneMaj'), valid: /[A-Z]/.test(password) },
      { label: t('formCondition.atLeastOneNumber'), valid: /\d/.test(password) },
      { label: t('formCondition.atLeastOneSpecialCharacter'), valid: /[^A-Za-z0-9]/.test(password) },
    ]);
  };

  const {
    handleSubmit: handleSubmitResetPassword,
    register: registerResetPassword,
    formState: { errors: errorsResetPassword },
    reset,
  } = useForm<{ password: string, code: string }>({
    resolver:
      yupResolver(schemaResetPasswordUpdate),
    reValidateMode: 'onChange',
  });

  const onSubmitResetPassword: SubmitHandler<{ password: string, code: string }> = async (data) => {
    try {
      await axios.post('/auth/reset-password/update', { ...data, email });
      navigate('/auth/signin', { replace: true });
    } catch (error) {
      const errorResponse = error as AxiosError;
      setErrorMessage(errorResponse.response?.data as string);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (event.target.name !== 'password') return;
    const password = event.target.value;
    validatePassword(password);
  };

  const handleClose = () => {
    setPasswordInputFocus(false);
    resetPasswordConditions();
    setOpenRequested(false);
    reset({
      code: undefined,
      password: undefined,
    });
  };

  return (
    <StyledResetPasswordModal
      open={openRequested}
      onClose={() => setOpenRequested(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="request-password-modal">
        <h2>{t('updatePasswordTitle', { ns: 'auth' })}</h2>
        <span className="description">{t('requestPasswordInfo', { ns: 'auth' })}</span>
        <StyledForm
          onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
          onChange={handlePasswordChange}
          className="form"
        >
          <div className="input-container">
            <div className="eye-container ">
              <StyledTextField
                error={!!errorsResetPassword.password}
                color="success"
                className="input"
                type={showPassword ? 'text' : 'password'}
                label={t('password', { ns: 'auth' })}
                autoComplete="current-password"
                variant="filled"
                {...registerResetPassword('password')}
                onFocus={() => setPasswordInputFocus(true)}
              />
              {showPassword ? <StyledNotEye onClick={() => setShowPassword(!showPassword)} />
                : <StyledEye onClick={() => setShowPassword(!showPassword)} />}
            </div>
            {passwordInputFocus || errorsResetPassword.password ? (
              <div className="password-requirements">
                <p>{t('formSchema.passwordContains', { ns: 'auth' })}</p>
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
            <StyledTextField
              error={!!errorsResetPassword.code}
              color="success"
              type="text"
              label="Code"
              variant="filled"
              {...registerResetPassword('code')}
            />
            {errorsResetPassword.code
              && typeof errorsResetPassword.code.message === 'string' && (
              <span role="alert" className="alert">
                {errorsResetPassword.code.message}
              </span>
            )}
          </div>
          <StyledAction>
            <StyledButton className="back-button" variant="contained" onClick={handleClose}>
              {t('back', { ns: 'common' })}
            </StyledButton>
            <StyledButton variant="contained" type="submit">
              {t('next', { ns: 'common' })}
            </StyledButton>
          </StyledAction>
        </StyledForm>
      </Box>
    </StyledResetPasswordModal>
  );
}
