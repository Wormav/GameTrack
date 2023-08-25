import React, { Dispatch, SetStateAction, useContext } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '@src/contexts/UserContext';
import { StyledDiv, StyledAiOutlineArrowLeft, StyledAvatar } from './BtnMobile.styles';

export default function BtnMobile({ setOpenMenuSettings }:
{ setOpenMenuSettings: Dispatch<SetStateAction<boolean>> }) {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate('/user-profile');
  };

  const handleClickSetting = () => {
    setOpenMenuSettings(true);
  };

  const handleClickArrow = () => {
    navigate(-1);
  };

  return (
    <StyledDiv>
      {location === '/'
        ? <StyledAvatar onClick={handleClickProfile} alt={user?.username} src={`${import.meta.env.VITE_API_URL}/user/avatar?filename=${user?.avatar ?? ''}`} />
        : <StyledAiOutlineArrowLeft onClick={handleClickArrow} />}
      <div className="container">
        <FiSettings onClick={handleClickSetting} />
      </div>
    </StyledDiv>
  );
}
