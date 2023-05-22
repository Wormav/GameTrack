import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  height: 100px;
  width: 100vw;

  ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    list-style: none;
    font-size: 25px;
    color: var(--text);
    text-align: center;

    li{
      padding-right: 15       px;
    }

    @media(max-width: 800px){
      font-size: 18px;
    }

    li:hover{
        cursor: pointer;
        color: var(--primary);
    }

  }
`;

export default StyledFooter;
