import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export const StyledDiv = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1{
    color: var(--text);
    margin: 0px 0 32px 16px;
  }

  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    min-height: 300px;
    background-color: var(--back-dark );
    padding: 32px 0 32px 0;
}
`;

export const StyledSlider = styled(Slider)`
  min-width: 100vw;
  padding-left: 16px;



  #card-container{
    margin-left: 16px;
  }
`;

export const StyledLink = styled(Link)`
  color: var(--text);
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  margin-top: 16px;
`;
