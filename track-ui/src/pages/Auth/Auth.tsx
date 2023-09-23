import React from 'react';
import { Outlet } from 'react-router-dom';
import backgourndPicture from '@assets/pictures/background-auth.jpg';
import StyledContainer from './auth.styles';

function Auth() {
  return (
    <StyledContainer>
      <div className="page-container">
        <div className="form-container">
          <h1>Playtracker</h1>
          <Outlet />
        </div>
        <img src={backgourndPicture} alt="une manette de console de jeux vidéo" />
      </div>
    </StyledContainer>
  );
}

export default Auth;
