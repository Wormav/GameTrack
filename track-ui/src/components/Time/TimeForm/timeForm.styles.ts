import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import transientOptions from '@src/styles/utils';

export const StyledTimeForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.90);
  z-index: 4;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--back-dark);
    padding: 16px;
    border-radius: 20px;

     .cross {
      position: absolute;
      left: 140px;
      font-size: 12px;
      color: var(--secondary);
      background-color: var(--btn);
      padding: 4px;
      border-radius: 50px;
    }

    h1 {
      margin-bottom: 32px;
    }
 
    > * {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      span {
        color : var(--danger);
        margin-bottom: 16px;
      }

      .button-container{
        display: flex ;
        justify-content: space-around;
        width: 100%;
      }
    }
  }
`;

export const StyledTextField = styled(TextField)`
    width: 300px;
    background-color: var(--back-dark);
    margin-bottom: 16px;

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
      div{
            color: var(--text);
        }

        label{
            color: var(--text);
        }
    `;

export const StyledButton = styled(Button, transientOptions) <{ $background?: boolean }>`
  margin: 16px 0;
  background-color: ${(props) => (props.$background ? 'var(--danger)' : 'var(--secondary)')};

  &:hover {
    background-color: ${(props) => (props.$background ? 'var(--danger-hover)' : 'var(--secondary-hover)')}
  }
`;
