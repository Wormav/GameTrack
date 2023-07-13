import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import SearchBarMobile from '@components/SearchBar/SearchBarMobile/SearchBarMobile';
import StyledNavMobile from './NavbarMobile.styles';

export default function NavbarMobile() {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/');
  };

  return (
    <StyledNavMobile>
      <div id="container">
        <IoGameControllerOutline />
        <AiOutlineHome onClick={onClickHome} />
        <SearchBarMobile />
      </div>
    </StyledNavMobile>
  );
}
