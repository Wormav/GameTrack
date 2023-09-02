import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 64px;


  h1 {
    margin: 64px;
    color: var(--text);
  }

  #container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 32px;
    justify-items: center;
    align-items: center;
    max-width: 90%;
    margin: 0 auto 32px auto;
  }
`;

export default StyledDiv;
