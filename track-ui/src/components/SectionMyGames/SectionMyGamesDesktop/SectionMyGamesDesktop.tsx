import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';
import { StyledDiv, StyledLink } from './sectionMyGamesDesktop.styles';
import GameCard from '../../GameCard/GameCard';

export default function SectionMyGamesDesktop() {
  const { games } = useContext(UserGamesContext);

  const reversedGames = games ? [...games].reverse() : [];

  return (
    <StyledDiv>
      <h1>
        Mes jeux (
        {games?.length}
        )
      </h1>
      {games && games?.length > 0
        ? (
          <section>
            <div id="container">
              {reversedGames?.slice(0, 10).map((g) => (
                <GameCard key={g.id} $clickable size="sm" id={g.id} />
              ))}
              <div id="link-container">
                <StyledLink to="/mygames" onClick={() => window.scrollTo(0, 0)}>{'Voir tout >'}</StyledLink>
              </div>
            </div>
          </section>
        ) : null}
    </StyledDiv>
  );
}
