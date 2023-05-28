import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const StyledIconButton = styled(IconButton)`
 
    width: 50px;
    height: 50px;
    border-radius: 50px;

    @media(max-width: 850px){
      width: 40px;
      height: 40px;
    }

    &:hover{
        cursor: pointer;
    }

    img{
        border-radius: 50px; 
    }
 
`;

export default StyledIconButton;
