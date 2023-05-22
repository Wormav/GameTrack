import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledDiv, StyledAiOutlineArrowLeft } from './BtnMobile.styles';

export default function BtnMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  const onClickArrow = () => {
    navigate(-1);
  };

  return (
    <StyledDiv>
      {currentUrl === '/' ? <img src="./Profil-default.png" alt="profil" /> : <StyledAiOutlineArrowLeft onClick={onClickArrow} />}
      <div>
        <FiSettings />
      </div>
    </StyledDiv>
  );
}
