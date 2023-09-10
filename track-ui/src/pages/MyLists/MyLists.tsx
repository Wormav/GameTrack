import React, { useContext } from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { UserListsContext } from '@src/contexts/UserLists.context';
import StyledDiv from './MyLists.styles';

export default function MyLists() {
  const { t } = useTranslation(['app']);

  const { userLists } = useContext(UserListsContext);
  return (
    <StyledDiv>
      <h1>{t('myLists')}</h1>
      <div id="container">
        {userLists?.slice(0, 9).sort((a, b) => a.name.localeCompare(b.name)).map((l) => (
          <ListCard key={l.id} size="sm" id={l.id} backgroundColor={l.backgroundColor} icon={l.icon} />
        ))}
      </div>
    </StyledDiv>
  );
}
