import GameCard from '@src/components/GameCard/GameCard';
import { UserListsContext } from '@src/contexts/UserLists.context';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import StyledDiv from './listDetails.styles';

export default function ListDetails() {
  const { id } = useParams();
  const ListId = parseInt(id ?? '-1', 10);

  const { userLists } = useContext(UserListsContext);

  const list = userLists?.find((g) => g.id === ListId);
  const games = list?.games;

  return (
    <StyledDiv>
      <h1>{ list?.name }</h1>
      <div id="container">
        {games?.map((g) => (
          <GameCard key={g.id} $clickable size="sm" id={g.id} />
        ))}
      </div>
    </StyledDiv>
  );
}
