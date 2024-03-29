import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  colorObject, iconObject,
} from '@src/utils/colorsAndIcons';
import { UserListsContext } from '@src/contexts/UserLists.context';
import { Tooltip } from '@mui/material';
import {
  StyledContainer, StyledFirstCard, StyledListCardContainer, StyledSecondCard,
} from './listCard.styles';

export enum ListCardSize {
  SM = 0,
  MD = 1,
  XL = 2,
}

interface ListCardProps {
  id: number;
  size: 'sm' | 'md' | 'xl';
  backgroundColor: string;
  icon: string;
}

export default function ListCard({
  id, size, backgroundColor, icon,
}: ListCardProps) {
  const navigate = useNavigate();

  const { userLists } = useContext(UserListsContext);

  const list = userLists?.find((l) => l.id === id);
  const gameList = list?.games;

  const colorSelect = colorObject[backgroundColor];
  const iconSelect = iconObject[icon];

  const getCardOptions = (s: string) => {
    switch (s.toUpperCase()) {
      case ListCardSize[ListCardSize.SM]:
        return { height: '300px', width: '200px', title_size: '1.5rem' };
      case ListCardSize[ListCardSize.MD]:
        return { height: '466px', width: '300px', title_size: '2rem' };
      case ListCardSize[ListCardSize.XL]:
        return { height: '776px', width: '500px', title_size: '3rem' };
      default:
        return { height: '466px', width: '300px', title_size: '2rem' };
    }
  };
  const cardOptions = getCardOptions(size);

  const handleClick = () => {
    navigate(`/list/${id}`);
  };

  return (
    <StyledContainer onClick={handleClick}>
      <StyledListCardContainer
        width={cardOptions.width}
        height={cardOptions.height}
        color={colorSelect as string}
        $titleSize={cardOptions.title_size}
      >
        <div id="icon-container">
          {iconSelect}
        </div>
        <Tooltip title={list?.name} placement="bottom">
          <h2>{list?.name}</h2>
        </Tooltip>
      </StyledListCardContainer>
      <StyledFirstCard
        width={cardOptions.width}
        height={cardOptions.height}
        cover={gameList && gameList.length > 0 ? gameList[0].cover : '#'}
      />
      <StyledSecondCard
        width={cardOptions.width}
        height={cardOptions.height}
        cover={gameList && gameList.length > 1 ? gameList[1].cover : '#'}
      />
    </StyledContainer>
  );
}
