import React from 'react';
import { StyledIconButton } from './buttonProfilDesktop.styles';

interface IButtonProfilDesktop {
  onClick : ()=>void
}

export default function ButtonProfilDesktop({ onClick } : IButtonProfilDesktop) {
  return (
    <StyledIconButton onClick={onClick}>
      <img src="./Profil-default.png" alt="profil" />
    </StyledIconButton>
  );
}
