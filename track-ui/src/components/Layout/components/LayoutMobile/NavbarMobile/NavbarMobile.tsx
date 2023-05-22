import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import StyledNavMobile from './NavbarMobile.styles';

export default function NavbarMobile() {
  return (
    <StyledNavMobile>
      <div>
        <IoGameControllerOutline />
        <AiOutlineHome />
        <AiOutlineSearch />
      </div>
    </StyledNavMobile>
  );
}
