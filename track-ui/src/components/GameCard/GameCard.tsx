import React from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import axios from '@config/axios.config';
import { useQuery, UseQueryResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StyledCompletedButtonIcon, StyledGameCardContainer, StyledGameCardContent } from './gamecard.styles';

export enum GameCardSize {
  SM = 0,
  MD = 1,
  XL = 2,
}

interface GameCardProps {
  size: 'sm' | 'md' | 'xl';
  isCompleted: boolean;
  id : number;
}

export default function GameCard({
  size, isCompleted, id,
}: GameCardProps) {
  const navigate = useNavigate();

  const getGame = async () => {
    const res = await axios.get(
      `games/game/${id}`,
      { withCredentials: true },
    );
    return res;
  };

  const onClickCard = () => {
    navigate(`game/${id}`);
  };

  interface GameData {
    data: {
      cover: string;
      description: string;
      game_id: number;
      genre:[];
      id: number;
      multiplayer: boolean;
      platform: [];
      publisher:[];
      release_date: [];
      title: string;
      update_at: string;
    };

  }

  const { data, error, isLoading }: UseQueryResult<GameData, unknown> = useQuery('game', getGame);

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

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
    data ? (
      <StyledGameCardContainer
        width={cardOptions.width}
        height={cardOptions.height}
        cover={data.data.cover}
        onClick={onClickCard}
      >
        <StyledGameCardContent $titleSize={cardOptions.title_size}>
          <span>{data.data.title}</span>
          <StyledCompletedButtonIcon
            $backgroundColor={isCompleted ? 'darkgreen' : undefined}
            $isCompleted={isCompleted}
            height={cardOptions.height}
          >
            <CheckSharpIcon />
          </StyledCompletedButtonIcon>
        </StyledGameCardContent>
      </StyledGameCardContainer>
    ) : null
  );
}
