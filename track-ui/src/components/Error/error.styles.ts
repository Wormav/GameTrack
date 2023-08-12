import styled from '@emotion/styled';

const StyledContainer = styled('div')`
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
  opacity: .95;
  z-index: 4;

  > * {
    margin-bottom: 32px;
  }

  span{
    font-weight: bold;
    font-size: 40px;
    color: var(--text);
    text-align: center;
  }

  .cross {
      font-size: 20px;
      color: var(--secondary);
      background-color: var(--btn);
      padding: 4px;
      border-radius: 50px;
    }
`;

export default StyledContainer;
