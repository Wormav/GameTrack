import React, { useState } from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import axios from '@config/axios.config';
import { StyledCompletedButtonIcon, StyledGameCardContainer, StyledGameCardContent } from './gamecard.styles';

export enum GameCardSize {
  SM = 0,
  MD = 1,
  XL = 2,
}

interface GameCardProps {
  size: 'sm' | 'md' | 'xl';
  isCompleted: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  id : number
}

export default function GameCard({
  size, isCompleted, onClick, id,
}: GameCardProps) {
  const [gameId, setGameId] = useState(null);

  const onSubmit = async () => {
    axios
      .get(
        `game/${id}`,
        { withCredentials: true },
      )
      .then((res) => {
        setGameId(res.data.id);
      });
  };

  const getCardOptions = (s: string) => {
    switch (s.toUpperCase()) {
      case GameCardSize[GameCardSize.SM]:
        return ({ height: '300px', width: '200px', title_size: '0.8rem' });
      case GameCardSize[GameCardSize.MD]:
        return ({ height: '466px', width: '300px', title_size: '1rem' });
      case GameCardSize[GameCardSize.XL]:
        return ({ height: '776px', width: '500px', title_size: '1.3rem' });
      default:
        return ({ height: '466px', width: '300px', title_size: '1rem' });
    }
  };
  const cardOptions = getCardOptions(size);
  return (
    <StyledGameCardContainer
      width={cardOptions.width}
      height={cardOptions.height}
      onClick={onClick}
    >
      <StyledGameCardContent $titleSize={cardOptions.title_size}>
        <span>The legend of zelda: ocarina of timeThe legend of zelda: ocarina of time</span>
        <StyledCompletedButtonIcon
          $backgroundColor={isCompleted ? 'darkgreen' : undefined}
          $isCompleted={isCompleted}
        >
          <CheckSharpIcon />
        </StyledCompletedButtonIcon>
      </StyledGameCardContent>
    </StyledGameCardContainer>
  );
}
