import React from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { StyledDiv, StyledLink, StyledSlider } from './sectionMyListMobile.styles';

export default function SectionMyListMobile() {
  const { t } = useTranslation(['app']);
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    // slidesToShow: reversedGames.length < 2 ? 1 : 2,
    slidesToShow: 2,
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
        {t('myLists')}
        {' '}
        (99)
      </h1>
      <div id="container">
        <StyledSlider {...settings}>
          <div id="card-container">
            <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
          </div>
          <div id="card-container">
            <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
          </div>
          <div id="card-container">
            <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
          </div>
        </StyledSlider>
      </div>
      <StyledLink to="/mylists" onClick={() => window.scrollTo(0, 0)}>{'Voir tout >'}</StyledLink>
    </StyledDiv>
  );
}
