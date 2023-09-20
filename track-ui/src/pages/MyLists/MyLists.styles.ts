import styled from '@emotion/styled';
import { Box, Button, Modal } from '@mui/material';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 64px;


  h1 {
    margin: 64px 0 32px 0;
    color: var(--text);
  }

  #container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 32px;
    justify-items: center;
    align-items: center;
    max-width: 90%;
    margin: 0 auto 32px auto;

    #card-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      #edit-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: var(--text);
        width: 100%;
        margin-bottom: 20px;

        > * {
          margin-left: 8px;

          :hover {
            cursor: pointer;
            color: var(--secondary);
          }
        }
      }
    }
  }
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const StyledModalDeleteList = styled(Modal)`
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
  `;

export const StyledBoxDeleteList = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--back-dark);
  max-width: 80%;
  max-height: 90%;
  border-radius: 15px;
  padding: 16px;

  h5{
    border-bottom: 3px solid var(--secondary);
    margin-bottom: 16px;
    text-align: center;
  }

  button {
    margin-right: 16px;
  }
  `;

export const StyledButton = styled(Button)`
    background-color: var(--secondary) ;
    margin-bottom: 16px;

        &:hover{
            background-color: var(--secondary-hover)
        }
`;
