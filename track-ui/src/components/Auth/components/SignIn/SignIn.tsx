import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-router-dom';
import axios from 'axios';
import schemaForm from '../../schema/yup';
import './signIn.scss';

interface Data {
  pseudo : string,
  email : string,
  password : string
}

function SignIn() {
  const [registerForm, setRegisterForm] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schemaForm) });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log(data);
    // axios.post(
    //   'urlDuback',
    //   {
    //     username: data.pseudo,
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          className="pseudo"
          {...register('pseudo')}
        />
        {errors.pseudo && typeof errors.pseudo.message === 'string' && (
        <span role="alert" className="formSpan">
          {errors.pseudo.message}
        </span>
        )}
      </div>
      <div>
        <input
          type="text"
          className="email"
          {...register('email')}
        />
        {errors.email && typeof errors.email.message === 'string' && (
        <span role="alert" className="formSpan">
          {errors.email.message}
        </span>
        )}
      </div>
      <div>
        <input
          type="password"
          className="password"
          {...register('password')}
        />
        {errors.password && typeof errors.password.message === 'string' && (
        <span role="alert" className="formSpan">
          {errors.password.message}
        </span>
        )}
      </div>
      {responseMessage && (
      <span className="reponseMessage">{responseMessage}</span>
      )}
      <div>
        <button className="btn" type="submit">
          {registerForm && 'Se connecter'}
        </button>
      </div>
    </Form>
  );
}

export default SignIn;
