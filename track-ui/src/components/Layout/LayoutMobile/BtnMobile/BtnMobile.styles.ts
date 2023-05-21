import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
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

export default StyledDiv;
