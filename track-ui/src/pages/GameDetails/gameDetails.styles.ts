import styled from '@emotion/styled';
import { Button } from '@mui/material';
import transientOptions from '../../styles/utils';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;

  @media (max-width: 480px){
          padding-top: 32px;
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

export const StyledButton = styled(Button, transientOptions) <{ $background?: boolean }>`
  margin: 64px 0;
  background-color: ${(props) => (props.$background ? 'var(--danger)' : 'var(--secondary)')};

  &:hover {
    background-color: ${(props) => (props.$background ? 'var(--danger-hover)' : 'var(--secondary-hover)')}
  }

  @media (max-width: 480px) {
    margin: 128px 0;
  }
`;
