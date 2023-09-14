import styled from '@emotion/styled';
import {
  Avatar, Button, Container, Modal, TextField,
} from '@mui/material';
import { BsEyeSlashFill } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { Form, Link } from 'react-router-dom';

export const StyleduserProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  margin-bottom: 0;

  #avatar-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 5rem;

    .MuiAvatar-root {
      font-size: 5rem;
    }
  }
  `;

export const StyledAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  background-color: var(--secondary-hover);
`;

export const StyledButton = styled(Button)`
    background-color: var(--secondary) ;
    width: 145px;
    height: 43px;
    border-radius: 8px;
    margin: 10px 0 30px 0;

    &:hover{
      background-color: var(--secondary-hover)
    }
`;

export const StyledCountGamesContainer = styled(Container)`
  width: 100%;
  background-color: var(--back-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 0;
  margin-bottom: 40px;
`;

export const StyledCountTimeGames = styled(Container)`
  width: 100%;
  background-color: var(--back-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 0;
  margin-bottom: 25px;
`;

export const StyledUpdateUserModal = styled(Modal)`
 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: fit-content;
  input[type='file'] {
    color: white;
  }
  
  #container {
    height: 100vh;
    overflow-y: scroll;
    border-radius: 15px;
    margin-top: 20px;

    &::-webkit-scrollbar {
      width: 0px;
    }

    @media (max-width: 400px) {
      width: 100%;  
    }
  }

  #form-update-user {
    overflow-y: scroll;
    height: fit-content;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 400px;
    padding: 10px 0 10px 0;
    background-color: var(--back-dark);

    @media (max-width: 400px) {
      width: 100%;  
    }

    &::-webkit-scrollbar {
      width: 0px;
    }

    #title {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .label-avatar-file-input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 950px){
      height: 100vh;
    }

    .icon-container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 50px;
    }

    .separator-container{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 50px;
      width: 300px;

      p {
        color: var(--text);
        font-size: 20px;
        margin: 0 10px 0 10px;
      }
    }

    .rod{
      background-color: var(--text);
      width: 100%;
      height: 1px;
    }

    .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;

    .eye-container{
        position: relative;
    }

    .alert{
      margin-top : 5px;
      color: red;

      .alert-response{
          margin: 5px;
          color: red
      }
    }

    .password-requirements{
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

export const StyledEye = styled(IoEyeSharp)`
     position: absolute;
     font-size: 20px;
     color: var(--text);
     right: 16px;
     bottom: 18px;

     :hover{
        cursor: pointer;
     }
     `;

export const StyledNotEye = styled(BsEyeSlashFill)`
     position: absolute;
     font-size: 20px;
     color: var(--text);
     right: 16px;
     bottom: 18px;

     :hover{
        cursor: pointer;
     }
     `;

export const StyledLink = styled(Link)`
color: var(--text);
    margin-top: 10px;
    text-decoration: none;

    &:hover{
      color: var(--secondary);
    }
`;

export const StyledSpan = styled.span`
   color: red;
   margin-bottom: 10px;
`;

export const StyledDeleteUserModal = styled(Modal)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #delete-user-modal {
    height: 185px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    padding: 10px 0 10px 0;
    background-color: var(--back-dark);

    #cancel{
      margin-right: 10px;
    }
  }
`;

export const StyledDeleteButton = styled(Button)`
  width: 150px;
  height: 43px;
  padding: 2px;
  border-radius: 8px;
  margin: 10px 0 100px 0;
`;
