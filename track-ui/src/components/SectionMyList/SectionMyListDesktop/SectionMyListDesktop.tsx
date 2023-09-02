import React from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { StyledDiv, StyledLink } from './sectionMyListDesktop.styles';

export default function SectionMyList() {
  return (
    <StyledDiv>
      <h1>Mes listes (99)</h1>
      <section>
        <div id="container">
          <ListCard id={1} size="sm" backgroundColor="chut" icon="chut" />
          <ListCard id={1} size="sm" backgroundColor="chut" icon="chut" />
          <ListCard id={1} size="sm" backgroundColor="chut" icon="chut" />
          <ListCard id={1} size="sm" backgroundColor="chut" icon="chut" />
          <ListCard id={1} size="sm" backgroundColor="chut" icon="chut" />
          <div id="link-container">
            <StyledLink to="/mylists" onClick={() => window.scrollTo(0, 0)}>{'Voir tout >'}</StyledLink>
          </div>
        </div>
      </section>
    </StyledDiv>
  );
}
