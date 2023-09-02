import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {
  StyledContainer, StyledFistCard, StyledListCardContainer, StyledSecondCard,
} from './listCard.styles';

export enum GameCardSize {
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

  const getCardOptions = (s: string) => {
    switch (s.toUpperCase()) {
      case GameCardSize[GameCardSize.SM]:
        return { height: '300px', width: '200px', title_size: '1.5rem' };
      case GameCardSize[GameCardSize.MD]:
        return { height: '466px', width: '300px', title_size: '2rem' };
      case GameCardSize[GameCardSize.XL]:
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
        color="#187B4F"
        titleSize={cardOptions.title_size}
      >
        <div id="icon-container">
          <IoGameControllerOutline size="100%" />
        </div>
        <h2>Titre de la liste</h2>
      </StyledListCardContainer>
      <StyledFistCard
        width={cardOptions.width}
        height={cardOptions.height}
        cover="#"
      />
      <StyledSecondCard
        width={cardOptions.width}
        height={cardOptions.height}
        cover="#"
      />
    </StyledContainer>
  );
}
