import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const StyledTimeForm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: var(--dark);
  z-index: 4;
`;

export const StyledTextField = styled(TextField)`
    width: 300px;


      div{
            color: var(--text);
        }

        label{
            color: var(--text);
        }
    `;
