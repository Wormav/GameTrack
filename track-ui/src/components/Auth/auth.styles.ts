import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { Form, Link } from 'react-router-dom';

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

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;

    .alert{
    margin-top : 5px;
    color: red;

    
}
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

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    background-color: var(--primary);
    box-shadow: 5px 5px 15px 5px #000000
;

        h1 {
    margin-bottom: 30px;
    color: var(--text);
    text-shadow: 2px 2px 2px black;
}
`;
