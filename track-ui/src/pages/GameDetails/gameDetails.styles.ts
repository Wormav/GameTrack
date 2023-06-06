import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 margin-top: 128px;

 @media (max-width: 480px){
        margin-top: 32px;
    }

 h1{
    color: var(--text);
    text-align: center;
 }

 main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 32px;

    @media (max-width: 950px){
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 480px){
        margin-top: 64px;
    }

    

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 70%;

         @media (max-width: 480px){
        margin-top: 64px;
        width: 90%;
    }

         div{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 64px;

             @media (max-width: 480px){
                 flex-direction: column;
             }

            span{

                color: var(--text);
                margin-right: 16px;
                font-weight: bolder;
                text-align: center;
            }
         }
    }
    
    p{
        color: var(--text);
        text-align: center;
        margin-left: 32px;
        margin-top: 32px;
        font-size: 20px;

         @media (max-width: 950px){
            margin-top : 32px;
         }
       
    }
 }
`;

export const StyledButton = styled(Button)`
    background-color: var(--secondary) ;
    margin: 64px 0;

        &:hover{
            background-color: var(--secondary-hover)
        }
`;
