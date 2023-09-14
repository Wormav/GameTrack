import React, { useContext } from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { UserListsContext } from '@src/contexts/UserLists.context';
import { StyledDiv, StyledLink } from './sectionMyListDesktop.styles';

export default function SectionMyList() {
  const { t } = useTranslation(['app']);

  const { userLists } = useContext(UserListsContext);

  return (
    <StyledDiv>
      <h1>
        {t('myLists')}
        {' '}
        {`(${userLists?.length})`}
      </h1>
      {userLists && userLists.length > 0 ? (
        <section>
          <div id="container">
            {userLists?.slice(0, 9).sort((a, b) => a.name.localeCompare(b.name)).map((l) => (
              <ListCard key={l.id} size="sm" id={l.id} backgroundColor={l.backgroundColor} icon={l.icon} />
            ))}
            <div id="link-container">
              <StyledLink to="/mylists" onClick={() => window.scrollTo(0, 0)}>{'Voir tout >'}</StyledLink>
            </div>
          </div>
        </section>
      ) : (
        <div id="container-no-content">
          <h2>{t('createYourFirstList', { ns: 'app' }) }</h2>
        </div>
      )}
    </StyledDiv>
  );
}
