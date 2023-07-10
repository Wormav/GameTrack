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
    window.scrollTo(0, 0);
  };

  const onClickMyGames = () => {
    navigate('/mygames');
    window.scrollTo(0, 0);
  };

  return (
    <StyledNavMobile>
      <div id="container">
        <IoGameControllerOutline onClick={onClickMyGames} />
        <AiOutlineHome onClick={onClickHome} />
        <SearchBarMobile />
      </div>
    </StyledNavMobile>
  );
}
