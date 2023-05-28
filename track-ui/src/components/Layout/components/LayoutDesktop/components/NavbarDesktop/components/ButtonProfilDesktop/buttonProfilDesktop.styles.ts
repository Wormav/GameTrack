import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const StyledIconButton = styled(IconButton)`
 
    @media(max-width: 850px){
      width: 40px;
      height: 40px;
    }

    &:hover{
        cursor: pointer;
    }
    
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%; 
    }
`;

export default StyledIconButton;
