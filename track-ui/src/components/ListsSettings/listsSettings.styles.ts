import styled from '@emotion/styled';
import {
  Modal, Box, TextField, Select, FormControl,
} from '@mui/material';
import { Form } from 'react-router-dom';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--back-dark);
  max-height: 90%;
  border-radius: 15px;
  padding: 16px;

  h4{
    border-bottom: 3px solid var(--secondary);
  }

  section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    font-size: 30px;
    color: var(--text);
    margin-left: 16px;
    padding-top: 16px;
    border-top: 3px solid var(--secondary);

    .addList{
      :hover{
        cursor: pointer;
      }
    }
  }

  .form-addList-container{
    padding-top: 32px;
    border-top: 3px solid var(--secondary);
  }
`;

export const StyledFormList = styled(Form)`
  width: 100%;
  overflow-y: scroll;
  border-radius: 15px;
  width: 400px;

  &::-webkit-scrollbar {
      width: 0px;
    }
  
  .input-container{

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin-top: 16px;

    .checkbox{
      color: var(--secondary);
      margin-right: 64px;
    }
    
    span {
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      color: var(--text);
      margin-left: 16px;
    }
 }
`;

export const StyledFormAddList = styled(FormControl)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

.first-section{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

  label{   
    color: var(--text);
    text-align: center;
  }

  #icon{
    margin-left: 60%;
  }

  

`;

export const StyledTextField = styled(TextField)`
    width: 300px;
    color: var(--text);
    margin-top: 16px;

  
`;

export const StyledSelect = styled(Select)`
    color: var(--text);
    width: 120px;
`;
