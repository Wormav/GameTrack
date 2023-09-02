import styled from '@emotion/styled';
import transientOptions from '@src/styles/utils';

export const StyledContainer = styled('div')`
  display: flex;
  position: relative;
`;

export const StyledListCardContainer = styled('div', transientOptions) <{ width: string, height: string, color: string, titleSize: string }>`
  z-index: 2;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 15px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.80);
  display: flex;
  background: linear-gradient(0deg, ${(props) => props.color} 0%, #000000 80%);

    &:hover{
     cursor: pointer;
    }

  #icon-container{
    background-color: var(--textfield-background);
    width: 60%;
    height: 40%;
    border-radius: 50%;
    font-size: large;
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
      width: 70%;
    }
  }

  h2{
   color: white;
   font-size: ${(props) => props.titleSize};
  }
`;

export const StyledFistCard = styled('div', transientOptions) <{ width: string, height: string, cover: string }>`
   position: absolute;
   z-index: 1;
   bottom: 7px;
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   background-color: red;
   border-radius: 15px;
   box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const StyledSecondCard = styled('div', transientOptions) <{ width: string, height: string, cover: string }>`
   position: absolute;
   z-index: 0;
   bottom: 14px;
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   background-color: blue;
   border-radius: 15px;
   box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
