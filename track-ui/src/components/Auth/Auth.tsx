import React from 'react';
import { Outlet } from 'react-router-dom';
import { StyledContainer } from './auth.styles';

function Auth() {
  return (
    <StyledContainer>
      <h1>Game Track</h1>
      <Outlet />
    </StyledContainer>
  );
}

export default Auth;
