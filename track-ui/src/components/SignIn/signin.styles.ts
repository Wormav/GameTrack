import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { Form, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsDiscord, BsEyeSlashFill } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50vw;
    height: 90vh;

    @media (max-width: 950px){
                height: 100vh;}


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

export const StyledGoogle = styled(FcGoogle)`
    font-size: 30px;
    background-color: white;
    padding: 10px 30px;
    border-radius: 20px;
    margin-right: 30px;
    cursor: pointer;
    border: 3px solid white;

    &:hover{
        border: 3px solid var(--secondary);
    }
`;

export const StyledDiscord = styled(BsDiscord)`
    font-size: 30px;
    color: white;
    background-color: black;
    padding: 10px 30px;
    border-radius: 20px;
    cursor: pointer;
    border: 3px solid black;

    

    &:hover{
        border: 3px solid var(--secondary);
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

export const StyledButton = styled(Button)`
    background-color: var(--secondary) ;

        &:hover{
            background-color: var(--secondary-hover)
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
