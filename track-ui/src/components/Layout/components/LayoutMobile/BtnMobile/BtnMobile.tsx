import React, { Dispatch, SetStateAction } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledDiv, StyledAiOutlineArrowLeft } from './BtnMobile.styles';

export default function BtnMobile({ setOpenMenuSettings }:
{ setOpenMenuSettings: Dispatch<SetStateAction<boolean>> }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handleClickSetting = () => {
    setOpenMenuSettings(true);
  };

  const handleClickArrow = () => {
    navigate(-1);
  };

  return (
    <StyledDiv>
      {location === '/' ? <img src="./Profil-default.png" alt="profil" /> : <StyledAiOutlineArrowLeft onClick={handleClickArrow} />}
      <div>
        <FiSettings onClick={handleClickSetting} />
      </div>
    </StyledDiv>
  );
}
