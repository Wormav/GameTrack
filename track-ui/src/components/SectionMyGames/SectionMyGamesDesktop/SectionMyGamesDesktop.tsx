import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledDiv, StyledLink } from './sectionMyGamesDesktop.styles';
import GameCard from '../../GameCard/GameCard';

export default function SectionMyGamesDesktop() {
  const { t } = useTranslation(['app', 'games']);
  const { userGames } = useContext(UserGamesContext);
  const games = userGames?.map((g) => g.game);

  const reversedGames = games ? [...games].reverse() : [];

  return (
    <StyledDiv>
      <h1>
        {`${t('my_games')} `}
        (
        {games?.length}
        )
      </h1>
      {games && games?.length > 0
        ? (
          <section>
            <div id="container">
              {reversedGames?.slice(0, 9).map((g) => (
                <GameCard key={g.id} $clickable size="sm" id={g.id} />
              ))}
              <div id="link-container">
                <StyledLink to="/mygames" onClick={() => window.scrollTo(0, 0)}>
                  {t('see_all')}
                  {' >'}
                </StyledLink>
              </div>
            </div>
          </section>
        ) : (
          <div id="container-no-content">
            <h2>{t('addOneGame', { ns: 'app' }) }</h2>
          </div>
        )}
    </StyledDiv>
  );
}
