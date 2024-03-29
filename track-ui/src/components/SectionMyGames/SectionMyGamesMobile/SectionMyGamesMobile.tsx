import { UserGamesContext } from '@src/contexts/UserGamesContext';
import React, { useContext } from 'react';
import GameCard from '@components/GameCard/GameCard';
import 'slick-carousel/slick/slick.css';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick-theme.css';
import { StyledDiv, StyledLink, StyledSlider } from './sectionMyGamesMobile.styles';

export default function SectionMyGamesMobile() {
  const { t } = useTranslation(['game', 'app']);
  const { userGames } = useContext(UserGamesContext);
  const games = userGames?.map((g) => g.game);

  const reversedGames = games ? [...games].reverse() : [];

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: reversedGames.length < 2 ? 1 : 2,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <StyledDiv>
      <h1>
        {`${t('my_games', { ns: 'app' })} (${games?.length})`}
      </h1>
      {games && games.length > 0 ? (
        <>
          <div id="container">
            <StyledSlider {...settings}>
              {reversedGames?.map((g) => (
                <div id="card-container" key={g.id}>
                  <GameCard $clickable size="sm" id={g.id} />
                </div>
              ))}
            </StyledSlider>
          </div>
          <StyledLink to="/mylists">
            {t('see_all', { ns: 'app' })}
            {' '}
            {'>'}
          </StyledLink>
        </>
      ) : (
        <div id="container">
          <h2>{t('addOneGame', { ns: 'app' }) }</h2>
        </div>
      )}
    </StyledDiv>
  );
}
