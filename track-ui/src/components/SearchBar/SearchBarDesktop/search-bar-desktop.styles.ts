import styled from '@emotion/styled';
import { Popover, TextField } from '@mui/material';
import transientOptions from '@styles/utils';

export const StyledSearchBar = styled(TextField, transientOptions) <{ $isFocused: boolean }>`
  width: ${({ $isFocused }) => ($isFocused ? '245px' : '60px')};
  .search-icon {
    color:black;
  }
  .icon-input{
    pointer-events: none;
  }
  .MuiOutlinedInput-root {
    border-color: yellow;

    &.Mui-focused fieldset {
      border-color: yellow;
      border: none;
    }

    fieldset {
      border-radius: 20px;
    }
  }

  background-color: var(--textfield-background);
  border-radius: 20px;
  transition: width 0.3s;


`;

export default StyledSearchBar;
