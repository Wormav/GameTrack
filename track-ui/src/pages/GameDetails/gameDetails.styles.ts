import styled from '@emotion/styled';
import { Button } from '@mui/material';
import transientOptions from '../../styles/utils';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;

  @media (max-width: 560px){
          padding-top: 32px;
      }

  h1{
      color: var(--text);
      text-align: center;
  }

  main {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 32px;
      margin-bottom: 32px;
      flex-direction: column;
      min-width: 90%;
      
      section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 95%;
       
         @media (max-width: 700px){
          flex-direction: column;
          }
      }

      .dashboard{
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          background-color: var(--back-dark);
          width: 70%;
          height: 466px;
          border-radius: 30px;
          margin-left: 16px;
          
          @media (max-width: 700px){
          margin-top: 64px;
          width: 90%;
          height: auto;
          }

          .settingIcon-container{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            height: 32px;
            margin: 16px 0 0 0;

            .settingIcon{
              color: var(--text);
              font-size: 40px;

              &:hover{
                cursor: pointer;
              }
            }
          }

          .container-top {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 50%;

              h2{
                margin-top: 16px;
                color: var(--text);   
              }

              div {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 8px;
                margin-bottom: 32px;
                padding-bottom: 16px;
                border-bottom: 2px solid var(--text);
                min-width: 30%;
                max-width: 90%;
                flex-wrap: wrap;

                @media (max-width: 700px){
                flex-direction: column;
                min-width: 60%;
                }

              span {
                  color: var(--text);
                  margin-right: 16px;
                  font-weight: bolder;
                  text-align: center;
                  margin-bottom: 8px;
                }
            }
          }

          .container-bottom {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 50%;

            @media (max-width: 700px){
            justify-content: center;
            flex-direction: column;
            }

            .element{
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 flex-direction: column;
                 height: 100%;
                 width: 50%;   
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

  .description{
    margin-top: 64px;
    width: 90%;

      @media (max-width: 560px){
      margin-bottom: 64px;
      }

    div{

        display: flex;
        align-items: flex-start;
        flex-direction: column;
        border-top: 2px solid var(--text);

      h2 {
        color: var(--text);
        margin-top: 32px;
      }

      p{
        text-align: start;
        margin-left: 0;
      }
    }
  }
`;

export const StyledButton = styled(Button, transientOptions) <{ $background?: boolean }>`
  margin: 16px 0;
  background-color: ${(props) => (props.$background ? 'var(--danger)' : 'var(--secondary)')};

  &:hover {
    background-color: ${(props) => (props.$background ? 'var(--danger-hover)' : 'var(--secondary-hover)')}
  }
`;
