import styled from '@emotion/styled';

const StyledNavMobile = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: var(--dark);
  opacity: 95%;
  width: 100%;
  height: 60px;

  #container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 16px;

    > * {
    color: var(--btn);
    font-size: 40px;

    &:hover{
        cursor: pointer;
    }
   }
  }
`;

export default StyledNavMobile;
