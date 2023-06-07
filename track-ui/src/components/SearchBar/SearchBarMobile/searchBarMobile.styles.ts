import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const StyledDiv = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: .9;

  z-index: 3;
  margin: 0;
  padding: 0;
  
  #search-container {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  margin: 5px;
  right: 0;
  font-size: 20px;
  color: var(--secondary);
  background-color: var(--btn);
  padding: 4px;
  border-radius: 50px;
`;
