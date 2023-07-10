import styled from '@emotion/styled';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  img{
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin: 16px;

    &:hover{
        cursor: pointer;
    }

  }
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    background-color: var(--secondary);
    border-radius: 100px;
    width: 40px;
    height: 40px;
    font-size: 30px;

    &:hover{
        cursor: pointer;
    }
  }
`;

export const StyledAiOutlineArrowLeft = styled(AiOutlineArrowLeft)`
  font-size: 30px;
  color: var(--secondary);
  margin: 16px;

  &:hover{
        cursor: pointer;
    }
`;
