import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledDiv, StyledAiOutlineArrowLeft } from './BtnMobile.styles';

export default function BtnMobile() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const onClickArrow = () => {
    navigate(-1);
  };

  return (
    <StyledDiv>
      {location === '/' ? <img src="./Profil-default.png" alt="profil" /> : <StyledAiOutlineArrowLeft onClick={onClickArrow} />}
      <div>
        <FiSettings />
      </div>
    </StyledDiv>
  );
}
