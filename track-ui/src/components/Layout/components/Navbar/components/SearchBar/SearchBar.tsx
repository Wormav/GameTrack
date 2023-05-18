import React from 'react';
import { StyledDiv, StyledInputBase } from './searchBar.styles';

export default function SearchBar() {
  return (
    <StyledDiv>
      <StyledInputBase placeholder="Rechercher..." />
    </StyledDiv>

  );
}
