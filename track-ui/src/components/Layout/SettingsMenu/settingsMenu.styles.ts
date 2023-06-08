import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: .8;
  z-index: 1;
  

  > * {
    span {
      font-size: 20px;
      color: var(--text);
      margin-bottom: 16px;

      &:hover {
        color: var(--secondary);
      }
    }

    .cross {
      font-size: 20px;
      color: var(--secondary);
      background-color: var(--btn);
      padding: 4px;
      border-radius: 50px;
    }
  }
`;

export default StyledDiv;
