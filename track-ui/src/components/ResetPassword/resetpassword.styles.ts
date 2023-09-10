import styled from '@emotion/styled';
import {
  Box, Button, Modal, TextField,
} from '@mui/material';
import { BsEyeSlashFill } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { Form } from 'react-router-dom';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 90vh;

  #reset-password-title {
    margin-bottom: 50px;
  }
  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;

    .eye-container {
      position: relative;
    }

    .alert {
      margin-top : 5px;
      color: red;

      .alert-response {
        margin: 5px;
        color: red
      }
    }

    .password-requirements {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 16px;
      font-size: 18px;

      p {
        color: var(--text);
        margin-bottom: 8px;
      }

      li {
        color: red;
      }

      .check{
        color : var(--secondary);
      }
    }
  }
`;

export const StyledTextField = styled(TextField)`
  width: 300px;
  color: var(--text);

  div{
    color: var(--text);
  }

  label{
    color: var(--text);
  }
`;

export const StyledButton = styled(Button)`
  background-color: var(--secondary) ;

  &:hover{
    background-color: var(--secondary-hover)
  }
`;

export const StyledAction = styled(Box)`
  display: flex;
  justify-content: cesnter;
  align-items: center;

  .back-button {
    margin-right: 20px;
  }
`;
