import React, { useContext } from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { UserListsContext } from '@src/contexts/UserLists.context';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { StyledButton, StyledDiv } from './MyLists.styles';

export default function MyLists() {
  const { t } = useTranslation(['app']);

  const { userLists } = useContext(UserListsContext);
  return (
    <StyledDiv>
      <h1>{t('myLists')}</h1>
      <StyledButton variant="contained" type="button">{t('createList')}</StyledButton>
      <div id="container">
        {userLists?.slice(0, 9).sort((a, b) => a.name.localeCompare(b.name)).map((l) => (
          <div id="card-container" key={l.id}>
            <div id="edit-container">
              <FaEdit />
              <AiTwotoneDelete />
            </div>
            <ListCard size="sm" id={l.id} backgroundColor={l.backgroundColor} icon={l.icon} />
          </div>
        ))}
      </div>
    </StyledDiv>
  );
}
