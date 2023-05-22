import styled from '@emotion/styled';

export const StyledNavDesktop = styled.nav`
 position: fixed;
 top: 0;
 left: 0;
 width: 100vw;
 height: 80px;
 background-color: var(--dark);
 font-size: 30px;
 display: flex;
 justify-content: center;
 box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px var(--primary);
 @media(max-width: 800px){
      font-size: 18px;
    }



 ul{
 display: flex;
 justify-content: space-between;
 align-items: center;
 list-style-type: none;
 color: var(--text);
 width: 100%;
 margin: 0 16px;

   
 }

 img{
    width: 50px;
    height: 50px;
    border-radius: 50%;

    @media(max-width: 800px){
      width: 40px;
      height: 40px;
    }

    &:hover{
        cursor: pointer;
    }
 }

`;

export const StyledLi = styled.li<{ isActive?: boolean }>`
 text-decoration: ${(p) => (p.isActive ? 'underline' : 'none')};
 text-decoration-thickness: ${(p) => (p.isActive ? '1px' : '0')};;
 text-underline-offset: ${(p) => (p.isActive ? '10px' : '0')};
&:after{
    content: '';
    display: block;
    margin: auto;
    height: 2px;
    width: 0;
    background: transparent;
    transition: width .5s ease, background-color .5s ease;
    }

    &:hover{
        cursor: pointer;
    }

    

    &:hover:after{
    width: ${(p) => (p.isActive ? '0' : '100%')};
    background: var(--text);
    }
`;
