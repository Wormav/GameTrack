import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import StyledNavMobile from './NavbarMobile.styles';

export default function NavbarMobile() {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/');
  };

  return (
    <StyledNavMobile>
      <div>
        <IoGameControllerOutline />
        <AiOutlineHome onClick={onClickHome} />
        <AiOutlineSearch />
      </div>
    </StyledNavMobile>
  );
}
