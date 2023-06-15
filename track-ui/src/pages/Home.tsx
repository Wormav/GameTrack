import GameCard from '@src/components/GameCard/GameCard';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';

function Home() {
  const userGames = useContext(UserGamesContext).games;

  return (
    userGames && userGames.map((g) => (
      <GameCard key={g.id} id={g.id} isCompleted $clickable size="sm" />
    ))
  );
}

export default Home;
