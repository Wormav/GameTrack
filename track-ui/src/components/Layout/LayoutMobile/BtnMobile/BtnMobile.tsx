import React from 'react';
import { FiSettings } from 'react-icons/fi';
import StyledDiv from './BtnMobile.styles';

export default function BtnMobile() {
  return (
    <StyledDiv>
      <img src="./Profil-default.png" alt="profil" />
      <div>
        <FiSettings />
      </div>
    </StyledDiv>
  );
}
