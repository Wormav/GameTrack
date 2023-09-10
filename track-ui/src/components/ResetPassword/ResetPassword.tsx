import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaResetPassword } from '@src/utils/yup/schema/yup';

import { useNavigate } from 'react-router-dom';
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

  const {
    handleSubmit: handleSubmitRequestResetPassword,
    register: registerRequestResetPassword,
    getValues,
    formState: { errors: errorsRequestResetPassword },
  } = useForm<{ email: string }>({ resolver: yupResolver(schemaResetPassword) });

  const onSubmitRequestResetPassword: SubmitHandler<{ email: string }> = async (data) => {
    setOpenRequested(true);
  };

  const handleBackToSignin = () => {
    navigate('/auth/signin');
  };

  return (
    <>
      <StyledForm
        onSubmit={handleSubmitRequestResetPassword(onSubmitRequestResetPassword)}
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
          <StyledButton variant="contained" type="submit">
            {t('next', { ns: 'common' })}
          </StyledButton>
        </StyledAction>
      </StyledForm>
      <ResetPasswordModal openRequested={openRequested} setOpenRequested={setOpenRequested} email={getValues('email')} />
    </>

  );
}
