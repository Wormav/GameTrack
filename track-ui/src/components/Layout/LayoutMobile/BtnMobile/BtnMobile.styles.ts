import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  img {
    border-radius: 100px;
    margin: 16px;

    &:hover {
        cursor: pointer;
    }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    background-color: var(--secondary);
    border-radius: 100px;
    width: 40px;
    height: 40px;
    font-size: 30px;

    &:hover {
        cursor: pointer;
    }
  }
`;

export const StyledAiOutlineArrowLeft = styled(AiOutlineArrowLeft)`
  font-size: 30px;
  color: var(--secondary);
  margin: 16px;

  &:hover {
        cursor: pointer;
    }
`;

export const StyledAvatar = styled(Avatar)`
  margin: 5px 0 0 5px;

  width: 45px;
  height: 45px;
  background-color: var(--secondary);
  margin-right: 10px;
`;
