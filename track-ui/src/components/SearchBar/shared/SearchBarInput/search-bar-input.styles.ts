import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import transientOptions from '@src/styles/utils';

const StyledSearchBar = styled(TextField, transientOptions) <{ $isFocused: boolean, $fixedWidth: boolean }>`
  width: ${({ $isFocused, $fixedWidth }) => {
    if ($isFocused) {
      return ($fixedWidth ? '245px' : '85%');
    }
    return ('60px');
  }};
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
