import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    margin: 32px;
    color: var(--text);
  }

  main {


  }

  #container {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    width: 100%;
    border: 1px solid red;
    align-items: stretch;
    justify-content: center;


  > * {
    margin: 16px;
    }
   }
`;

export default StyledDiv;
