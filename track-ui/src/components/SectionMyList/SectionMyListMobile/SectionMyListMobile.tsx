import React, { useContext } from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { UserListsContext } from '@src/contexts/UserLists.context';
import { StyledDiv, StyledLink, StyledSlider } from './sectionMyListMobile.styles';

export default function SectionMyListMobile() {
  const { t } = useTranslation(['app']);

  const { userLists } = useContext(UserListsContext);

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
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

  const orderedLists = userLists?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <StyledDiv>
      <h1>
        {` ${t('myLists')} (${userLists?.length})`}
      </h1>

      {userLists && userLists.length > 0 ? (
        <>
          <div id="container">
            <StyledSlider {...settings}>
              {orderedLists?.map((l) => (
                <div key={l.id} id="card-container">
                  <ListCard size="sm" id={l.id} backgroundColor={l.backgroundColor} icon={l.icon} />
                </div>
              ))}
            </StyledSlider>
          </div>
          <StyledLink to="/mylists">
            {t('see_all', { ns: 'app' })}
            {' >'}
          </StyledLink>

        </>
      ) : (
        <div id="container">
          <h2>{t('createYourFirstList') }</h2>
        </div>
      )}

    </StyledDiv>
  );
}
