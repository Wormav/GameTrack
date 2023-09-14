import styled from '@emotion/styled';
import { Box, Modal } from '@mui/material';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 64px;

  h1 {
    margin: 64px;
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
      align-items: flex-end;
      color: var(--text);

      > * {
        margin-bottom: 8px;

        :hover {
          cursor: pointer;
          color: var(--secondary);
        }
      }
    }
  }
`;

export const StyledModalDeleteGame = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const StyledBoxDeleteGame = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--back-dark);
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
