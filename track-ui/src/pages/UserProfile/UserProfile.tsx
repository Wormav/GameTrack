import React, { useContext, useState } from 'react';
import {
  Alert,
  AlertColor,
  Box, Button, Snackbar, Typography,
} from '@mui/material';
import { User, UserContext } from '@src/contexts/UserContext';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import { convertTimeHowlongToTime } from '@src/utils/convertFormatsTime';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaFormUpdateUser } from '@src/utils/yup/schema/yup';
import { PasswordCondition } from '@src/components/Signup/Signup';
import axios from '@config/axios.config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  StyledAvatar,
  StyledButton,
  StyledCountGamesContainer,
  StyledCountTimeGames,
  StyledDeleteButton,
  StyledDeleteUserModal,
  StyledEye,
  StyledForm,
  StyledNotEye,
  StyledTextField,
  StyledUpdateUserModal,
  StyleduserProfileContainer,
} from './userProfile-styles';

interface IUpdateUser {
  pseudo: string
  password: string
  passwordConfirmation: string
}

interface IResponseMessage {
  message: string
  status: string
}

export default function UserProfile() {
  const { t } = useTranslation(['auth', 'user', 'common', 'game']);
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { userGames } = useContext(UserGamesContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState<PasswordCondition[]>([
    { label: t('formCondition.minCharacter'), valid: false },
    { label: t('formCondition.atLeastOneMaj'), valid: false },
    { label: t('formCondition.atLeastOneNumber'), valid: false },
    { label: t('formCondition.atLeastOneSpecialCharacter'), valid: false },
  ]);

  const gamesDone = userGames?.filter((game) => game.done === true).length ?? 0;
  const gamesTime = userGames?.reduce((acc, game) => {
    const time = game.game_time;
    const mainStoryTime = time?.main_story ?? 0;

    return (acc + mainStoryTime);
  }, 0) ?? 0;

  const handleUpdateUser = () => {
    setOpenUpdateUser((prev) => !prev);
    setResponseMessage(null);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUpdateUser>({ resolver: yupResolver(schemaFormUpdateUser) });

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

  const onSubmit: SubmitHandler<IUpdateUser> = async (data) => {
    const userData: Partial<User> = {};
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('avatar', selectedFile);
        userData.avatar = selectedFile.name;
      }
      if (data.pseudo) {
        formData.append('pseudo', data.pseudo);
        userData.username = data.pseudo;
      }
      if (data.password) {
        formData.append('password', data.password);
      }

      const response = await axios.post(
        '/user',
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.avatar) {
        userData.avatar = response.data.avatar;
      }
      updateUser(userData);
      setOpenUpdateUser(false);
      setResponseMessage({ message: t('updatedProfileSuccess', { ns: 'user' }), status: 'success' });
      setSelectedFile(null);
    } catch (error) {
      setResponseMessage({ message: t('updatedProfileError', { ns: 'user' }), status: 'error' });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const handleOpenDeleteUser = () => {
    setOpenDeleteUser((prev) => !prev);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete('/user', { withCredentials: true });
      navigate('/auth/signin', { replace: true });
    } catch (error) {
      setResponseMessage({ message: t('deleteProfileError'), status: 'error' });
    }
  };
  return (
    <StyleduserProfileContainer disableGutters maxWidth={false}>
      <div id="avatar-container">
        <StyledAvatar alt={user?.username} src={`${import.meta.env.VITE_API_URL}/user/avatar?filename=${user?.avatar ?? ''}`} />
        <Typography variant="h4" color="white">{user?.username}</Typography>
        <StyledButton variant="contained" color="success" onClick={handleUpdateUser}>
          {t('edit', { ns: 'common' })}
        </StyledButton>
        <StyledUpdateUserModal
          open={openUpdateUser}
          onClose={handleUpdateUser}
          aria-labelledby="update-user-modal"
          aria-describedby="update-user-modal"
        >
          <div id="container">
            <Box id="form-update-user">
              <Typography id="title" variant="h4" color="white">{t('updateProfile', { ns: 'user' })}</Typography>

              <StyledForm onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="input-container">
                  <label htmlFor="avatar-file-input" className="label-avatar-file-input">
                    <StyledAvatar
                      alt={user?.username}
                      src={selectedFile ? URL.createObjectURL(selectedFile) : `${import.meta.env.VITE_API_URL}/user/avatar?filename=${user?.avatar ?? ''}`}
                    />
                    <input
                      type="file"
                      id="avatar-file-input"
                      name="avatar"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>

                </div>
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
                  <div className="eye-container ">
                    <StyledTextField
                      error={!!errors.password}
                      color="success"
                      className="input"
                      type={showPassword ? 'text' : 'password'}
                      label={t('password', { ns: 'auth' })}
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
                      <p>{ t('formSchema.passwordContains', { ns: 'auth' })}</p>
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
                      label={t('confirmPassword', { ns: 'auth' })}
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
                <div>
                  <StyledButton className="btn" variant="contained" type="submit">
                    {t('update', { ns: 'common' })}
                  </StyledButton>
                </div>
              </StyledForm>
            </Box>
          </div>
        </StyledUpdateUserModal>
      </div>
      <StyledCountTimeGames disableGutters maxWidth={false}>
        <Typography variant="h6" color="white">{t('gameTime', { ns: 'game' })}</Typography>
        <Typography variant="h6" color="white">{convertTimeHowlongToTime(gamesTime, false)}</Typography>
      </StyledCountTimeGames>
      <StyledCountGamesContainer disableGutters maxWidth={false}>
        <Typography variant="h6" color="white">{t('gamesDone', { ns: 'game' })}</Typography>
        <Typography variant="h6" color="white">{gamesDone}</Typography>
      </StyledCountGamesContainer>
      <StyledDeleteButton variant="contained" color="error" onClick={handleOpenDeleteUser}>
        {t('delete', { ns: 'common' })}
      </StyledDeleteButton>
      <StyledDeleteUserModal
        open={openDeleteUser}
        onClose={handleOpenDeleteUser}
        aria-labelledby="delete-user-modal"
        aria-describedby="delete-user-modal"
        disableScrollLock
      >
        <Box id="delete-user-modal">
          <Typography variant="h4" color="white">{t('deleteAccount')}</Typography>
          <Typography variant="body1" color="white">{t('confirmDeleteAccount')}</Typography>
          <div id="action">
            <Button id="cancel" variant="contained" color="error" onClick={handleOpenDeleteUser}>
              {t('cancel', { ns: 'common' })}
            </Button>
            <Button variant="contained" color="success" onClick={handleDeleteUser}>
              {t('delete', { ns: 'common' })}
            </Button>
          </div>
        </Box>
      </StyledDeleteUserModal>
      {responseMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!responseMessage}
          autoHideDuration={4000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity={responseMessage.status as AlertColor}
          >
            {responseMessage.message}
          </Alert>
        </Snackbar>
      )}
    </StyleduserProfileContainer>
  );
}
