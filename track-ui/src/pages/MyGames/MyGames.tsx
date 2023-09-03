import GameCard from '@src/components/GameCard/GameCard';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import StyledDiv from './myGames.styles';

export default function MyGames() {
  const { t } = useTranslation();
  const { userGames } = useContext(UserGamesContext);
  const games = userGames?.map((g) => g.game);

  const reversedGames = games ? [...games].reverse() : [];

  return (
    <StyledDiv>
      <h1>{ t('my_games') }</h1>
      <div id="container">
        {reversedGames?.map((g) => (
          <GameCard key={g.id} $clickable size="sm" id={g.id} />
        ))}
      </div>
    </StyledDiv>
  );
}
