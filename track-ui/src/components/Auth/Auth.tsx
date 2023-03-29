import React from 'react';
import { Outlet } from 'react-router-dom';
import { StyledContainer } from './auth.styles';
import backgourndPicture from '../../assets/pictures/background-auth-page.jpeg';

function Auth() {
  return (
    <StyledContainer>
      <div className="page-container">
        <div className="form-container">
          <h1>Game Track</h1>
          <Outlet />
        </div>
        <img src={backgourndPicture} alt="une manette de console de jeux vidéo" />
      </div>
    </StyledContainer>
  );
}

export default Auth;
