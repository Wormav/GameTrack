import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { schemaFormSignin } from '../../schema/yup';
import './signUp.scss';

interface Data {
  pseudo : string,
  email : string,
  password : string
}

function SignUp() {
  const [registerForm, setRegisterForm] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaFormSignin) });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log(data);
    // axios.post(
    //   'urlDuback',
    //   {
    //     email: data.email,
    //     password: data.password,
    //   },
    //   { withCredentials: true },
    // ).then((res) => {
    //   const reponse = res.data;
    //   setResponseMessage(reponse.message);
    // })
    //   .catch((err) => {
    //     setResponseMessage(err.message);
    //   });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="input-container">
        <TextField
          className="input"
          type="text"
          label="Pseudo"
          autoComplete="current-name"
          {...register('email')}
        />
        {errors.email && typeof errors.email.message === 'string' && (
        <span role="alert" className="alert">
          {errors.email.message}
        </span>
        )}
      </div>
      <div className="input-container">
        <TextField
          className="input"
          type="email"
          label="Email"
          autoComplete="current-email"
          {...register('email')}
        />
        {errors.email && typeof errors.email.message === 'string' && (
        <span role="alert" className="alert">
          {errors.email.message}
        </span>
        )}
      </div>
      <div className="input-container">
        <TextField
          className="input"
          type="password"
          label="Mots de passe"
          autoComplete="current-password"
          {...register('password')}
        />
        {errors.password && typeof errors.password.message === 'string' && (
        <span role="alert" className="alert">
          {errors.password.message}
        </span>
        )}
      </div>
      {responseMessage && (
      <span className="reponseMessage">{responseMessage}</span>
      )}
      <div>
        <Button className="btn" variant="contained" type="submit">
          Se connecter
        </Button>
      </div>
    </Form>
  );
}

export default SignUp;
