import React from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import StyledDiv from './MyLists.styles';

export default function MyLists() {
  const { t } = useTranslation(['app']);
  return (
    <StyledDiv>
      <h1>{t('myLists')}</h1>
      <div id="container">
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
        <ListCard size="sm" id={1} backgroundColor="test" icon="test" />
      </div>
    </StyledDiv>
  );
}
