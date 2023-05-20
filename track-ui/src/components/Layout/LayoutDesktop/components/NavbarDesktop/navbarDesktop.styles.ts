import styled from '@emotion/styled';

const StyledNav = styled.nav`
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



 ul{
 display: flex;
 justify-content: space-between;
 align-items: center;
 list-style-type: none;
 color: var(--text);
 width: 100%;
 margin: 0 16px;

   li{
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
    width: 100%;
    background: var(--text);
    }
   } 
 }

 img{
    width: 50px;
    height: 50px;
    border-radius: 50%;

    &:hover{
        cursor: pointer;
    }
 }

`;

export default StyledNav;
