import styled from '@emotion/styled';
import { Avatar, IconButton } from '@mui/material';

export const StyledIconButton = styled(IconButton)`
    margin-left: 7px;
    @media(max-width: 850px){
      width: 40px;
      height: 40px;
    }

    &:hover{
        cursor: pointer;
    }
    @media(max-width: 850px){
      margin-right: 15px;
    }

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`;

export const StyledAvatar = styled(Avatar)`
  width: 55px;
  height: 55px;
  background-color: var(--secondary);
  margin-right: 10px;
  cursor: pointer;
`;

export default StyledAvatar;
