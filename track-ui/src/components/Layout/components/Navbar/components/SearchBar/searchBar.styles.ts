import styled from '@emotion/styled';
import InputBase from '@mui/material/InputBase';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 300px;
`;

export const StyledInputBase = styled(InputBase)`
 background-color: var(--btn);
 border-radius: 20px;
 height: 50px;
 width: 100%;

 input{
  text-indent: 10px;
 }

 
`;
