import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  height: 100px;
  width: 100%;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    list-style: none;
    text-align: center;

    li {
      color: var(--text);
      font-size: 25px;

      @media(max-width: 850px) {
        font-size: 18px;
      }
    }

    li:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }
`;

export default StyledFooter;
