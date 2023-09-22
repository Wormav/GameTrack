import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: var(--text);
  max-width: 80vw;
  min-height: 70vH;
  text-align: center;
  margin: auto;

  h1 {
    margin-top: 32px;
  }

  > * {
    margin-bottom: 16px;
  }

  h2 {
    color: var(--secondary);
    text-decoration: underline;
  }

  li {
    list-style: none;
    margin-bottom: 16px;
  }

  span{
    font-weight: bold;
    color: var(--secondary);
  }

  a {
    text-decoration: none;
    color: var(--text);

    &:hover {
      color: var(--secondary);
    }
  }
`;

export default StyledContainer;
