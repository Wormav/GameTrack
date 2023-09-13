import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaResetPassword } from '@src/utils/yup/schema/yup';
import axios from '@config/axios.config';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { AxiosError } from 'axios';
import {
  StyledAction,
  StyledButton,
  StyledForm,

  StyledTextField,
} from './resetpassword.styles';
import ResetPasswordModal from './ResetPasswordModal';

export default function ResetPassword() {
  const { t } = useTranslation(['auth', 'user', 'common']);
  const navigate = useNavigate();
  const [openRequested, setOpenRequested] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = React.useState<string>('');

  const {
    handleSubmit: handleSubmitRequestResetPassword,
    register: registerRequestResetPassword,
    getValues,
    formState: { errors: errorsRequestResetPassword },
  } = useForm<{ email: string }>({ resolver: yupResolver(schemaResetPassword) });

  const onSubmitRequestResetPassword: SubmitHandler<{ email: string }> = async (data) => {
    setDisabled(true);
    try {
      await axios.post('/auth/reset-password/request', data);
      setOpenRequested(true);
    } catch (error) {
      const errorResponse = error as AxiosError;
      setErrorResponseMessage(errorResponse.response?.data as string);
    }
    setDisabled(false);
  };

  const handleBackToSignin = () => {
    navigate('/auth/signin');
  };

  const handleCloseError = () => {
    setErrorResponseMessage('');
    setDisabled(false);
  };

  return (
    <>
      <StyledForm
        onSubmit={handleSubmitRequestResetPassword(
          onSubmitRequestResetPassword,
        )}
        className="form"
      >
        <h1 id="reset-password-title">{t('resetPasswordTitle', { ns: 'auth' })}</h1>
        <div className="input-container">
          <StyledTextField
            error={!!errorsRequestResetPassword.email}
            color="success"
            type="text"
            label="Email"
            autoComplete="current-email"
            variant="filled"
            {...registerRequestResetPassword('email')}
          />
          {errorsRequestResetPassword.email && typeof errorsRequestResetPassword.email.message === 'string' && (
          <span role="alert" className="alert">
            {errorsRequestResetPassword.email.message}
          </span>
          )}
        </div>
        <StyledAction>
          <StyledButton className="back-button" variant="contained" onClick={handleBackToSignin}>
            {t('back', { ns: 'common' })}
          </StyledButton>
          <StyledButton variant="contained" type="submit" disabled={disabled}>
            {t('next', { ns: 'common' })}
          </StyledButton>
        </StyledAction>
      </StyledForm>
      <ResetPasswordModal openRequested={openRequested} setOpenRequested={setOpenRequested} email={getValues('email')} setErrorMessage={setErrorResponseMessage} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!errorResponseMessage}
        autoHideDuration={4000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
        >
          {errorResponseMessage ? t(errorResponseMessage, { ns: 'auth' }) : ''}
        </Alert>
      </Snackbar>
    </>

  );
}
