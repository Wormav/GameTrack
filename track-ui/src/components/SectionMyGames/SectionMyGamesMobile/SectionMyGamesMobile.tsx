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
    speed: 500,
    slidesToShow: reversedGames.length < 2 ? 1 : 2,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <StyledDiv>
      <h1>
        {`${t('my_games')} `}
        (
        {games?.length}
        )
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
          <StyledLink to="/mygames" onClick={() => window.scrollTo(0, 0)}>{t('see_all')}</StyledLink>
        </>
      ) : null}
    </StyledDiv>
  );
}
