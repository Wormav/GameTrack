import React from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import StyledDiv from './MyLists.styles';

export default function MyLists() {
  return (
    <StyledDiv>
      <h1>Mes listes</h1>
      <div id="container">
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
      </div>
    </StyledDiv>
  );
}
