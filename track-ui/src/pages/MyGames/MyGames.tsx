import GameCard from '@src/components/GameCard/GameCard';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';
import StyledDiv from './myGames.styles';

export default function MyGames() {
  const { games } = useContext(UserGamesContext);

  const reversedGames = games ? [...games].reverse() : [];

  return (
    <StyledDiv>
      <h1>Mes jeux</h1>
      <div id="container">
        {reversedGames?.map((g) => (
          <GameCard key={g.id} $clickable size="sm" id={g.id} />
        ))}
      </div>
    </StyledDiv>
  );
}
