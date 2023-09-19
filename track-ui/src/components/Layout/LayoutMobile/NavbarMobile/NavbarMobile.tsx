import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBarMobile from '@components/SearchBar/SearchBarMobile/SearchBarMobile';
import StyledNavMobile from './NavbarMobile.styles';

export default function NavbarMobile() {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/');
  };

  const onClickMyGames = () => {
    navigate('/mygames');
  };

  const onClickMyLists = () => {
    navigate('/mylists');
  };

  return (
    <StyledNavMobile>
      <div id="container">
        <IoGameControllerOutline onClick={onClickMyGames} />
        <AiOutlineHome onClick={onClickHome} />
        <FaListUl onClick={onClickMyLists} />
        <SearchBarMobile />
      </div>
    </StyledNavMobile>
  );
}
