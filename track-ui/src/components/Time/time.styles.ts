import styled from '@emotion/styled';
import { BiEditAlt } from 'react-icons/bi';

export const StyledTime = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    background-color: var(--dark);
    height: 160px;
    width: 50%;
    border-radius: 20px;
    padding: 0 32px;
    margin-left: 16px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.20);

    @media(max-width: 850px) {
          width: 60%;
          }

    @media (max-width: 700px) {
          width: 80%;
          }
          
    h1{
        font-size: 20px;

        @media(max-width: 750px) {
          font-size: 16px;
          }
    }

    span {
        color: var(--text);
        font-size: 18px;
        text-align: center;

        @media(max-width: 750px) {
          font-size: 16px;
          }
    }
`;

export const StyledEditIcon = styled(BiEditAlt)`
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    `;
