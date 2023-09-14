import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledDiv = styled.div`

  h1{
    color: var(--text);
    margin: 129px 0 32px 32px;
  }

  #container-no-content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: var(--back-dark );

    h2{
      color: var(--text);
      margin: 32px 0 32px 32px;
    }
  }

  

  section {
    background-color: var(--back-dark );
    width: 100%;
    padding: 32px 0;

   #container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 32px;
    justify-items: center;
    align-items: center;
    max-width: 90%;
    margin: 0 auto 0 auto;

    #link-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
      width: 200px;
      border-radius: 15px;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
      background-color: #1f1f2c;
    }
  }
  }
`;

export const StyledLink = styled(Link)`
  color: var(--text);
  text-decoration: none;
  font-size: 20px;
  text-align: center;
`;
