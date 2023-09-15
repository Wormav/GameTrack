import styled from '@emotion/styled';
import {
  TextField, Select, FormControl, Button,
} from '@mui/material';
import { Form } from 'react-router-dom';

export const StyledFormNewList = styled(Form)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 32px;
    border-top: 3px solid var(--secondary);
    width: 100%;

    .top-container{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 75%;
    }
`;

export const StyledFormAddList = styled(FormControl)`
    display: flex;
    justify-content: center;
    align-items: center;

    label{   
      color: var(--text);
      text-align: center;
    }

    label.Mui-focused{
      color: var(--secondary);
    }
`;

export const StyledSelect = styled(Select)`
    color: var(--text);
    width: 100px;  
    
    .MuiSelect-icon{
      color: var(--text);
    }
`;

export const StyledTextField = styled(TextField)`
    width: 300px;
    color: var(--text);
    margin-top: 16px;

     div{
            color: var(--text);
        }

      label{
            color: var(--text);
        }
`;

export const StyledButton = styled(Button)`
    background-color: var(--secondary) ;
    margin-top: 16px;

      &:hover{
          background-color: var(--secondary-hover)
      }
`;
