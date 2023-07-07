import GameCard from '@src/components/GameCard/GameCard';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { StyledDiv, StyledGrid } from './myGames.styles';

export default function MyGames() {
  const { games } = useContext(UserGamesContext);

  return (
    <StyledDiv>
      <h1>Mes jeux</h1>
      <div id="container">
        {games?.map((g) => (
          <GameCard key={g.id} $clickable size="sm" id={g.id} />
        ))}
      </div>
    </StyledDiv>
  );
}
