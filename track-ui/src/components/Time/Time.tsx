import React, { useContext } from 'react';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import { StyledTime, StyledEditIcon } from './time.styles';

interface TimeProps {
  gameId: number;
  gameInUserGames : boolean;
}

export default function Time({ gameId, gameInUserGames }: TimeProps) {
  const { userGames } = useContext(UserGamesContext);

  const game = userGames?.find((g) => g.game_id === gameId);
  // pour utiliser game_time dans le span

  return (
    <StyledTime>
      {gameInUserGames ? (
        <>
          <h1>Temps de jeu :</h1>
          <StyledEditIcon />
          <span>2 jours 5 heures 23 minutes</span>
        </>
      ) : (
        <h1>Ajouter ce jeu pour ajouter un temps de jeu</h1>
      )}
    </StyledTime>
  );
}
