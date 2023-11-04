import React, {
  useEffect, useState, useContext, useCallback,
} from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import axios from '@config/axios.config';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Game, UserGamesContext } from '@src/contexts/UserGamesContext';
import { ErrorContext } from '@src/contexts/ErrorContext';
import { Tooltip } from '@mui/material';
import {
  StyledCompletedButtonIcon,
  StyledGameCardContainer,
  StyledGameCardContent,
  StyledSkeleton,
} from './gameCard.styles';
import defaultCover from '../../assets/pictures/default-cover.jpg';

export enum GameCardSize {
  SM = 0,
  MD = 1,
  XL = 2,
}

interface GameCardProps {
  size: 'sm' | 'md' | 'xl';
  id: number;
  $clickable: boolean;
}

export default function GameCard({ size, id, $clickable }: GameCardProps) {
  const [gameInUserGames, setGameInUserGames] = useState(false);
  const { setUpdateUserGames, userGames } = useContext(UserGamesContext);
  const { setError } = useContext(ErrorContext);
  const games = userGames?.map((g) => g.game);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const checkGameInUserGames = useCallback(
    () => (games ? games.some((g: Game) => g.id === id) : false),
    [games, id],
  );

  useEffect(() => setGameInUserGames(checkGameInUserGames()), [games, checkGameInUserGames]);

  const fetchGame = () => axios.get(`games/game/${id}`, { withCredentials: true });
  const { data, error, isLoading } = useQuery(['game', id], fetchGame);

  const addGameMutation = useMutation(() => axios.post('/user/game', { gameId: id }, { withCredentials: true }), {
    onSuccess: () => {
      setGameInUserGames(true);
      setUpdateUserGames((prev) => !prev);
      queryClient.invalidateQueries(['game', id]);
    },
    onError: () => setError(true),
  });

  const deleteGameMutation = useMutation(() => axios.delete('/user/game', { params: { gameId: id }, withCredentials: true }), {
    onSuccess: () => {
      setGameInUserGames(false);
      setUpdateUserGames((prev) => !prev);
      queryClient.invalidateQueries(['game', id]);
    },
    onError: () => setError(true),
  });

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (gameInUserGames) {
      deleteGameMutation.mutate();
    } else {
      addGameMutation.mutate();
    }
  };

  const cardOptions = {
    sm: { height: '300px', width: '200px', title_size: '0.8rem' },
    md: { height: '466px', width: '300px', title_size: '1rem' },
    xl: { height: '776px', width: '500px', title_size: '1.3rem' },
  }[size];

  if (isLoading) return <StyledSkeleton variant="rectangular" width={cardOptions.width} height={cardOptions.height} />;
  if (error) {
    setError(true);
    if (import.meta.env.DEBUG === 'true') {
      // eslint-disable-next-line no-console
      console.error({ message: 'GameCard', error });
    }
  }

  return data ? (
    <StyledGameCardContainer
      width={cardOptions.width}
      height={cardOptions.height}
      cover={data.data.cover || defaultCover}
      $clickable={$clickable}
      onClick={() => $clickable && navigate(`/game/${id}`)}
    >
      <StyledGameCardContent $titleSize={cardOptions.title_size}>
        <Tooltip title={data.data.title} placement="bottom">
          <span className="title">{data.data.title}</span>
        </Tooltip>
        <StyledCompletedButtonIcon
          $backgroundColor={gameInUserGames ? 'darkgreen' : undefined}
          $inUserGames={gameInUserGames}
          onClick={handleClickButton}
          height={cardOptions.height}
          disabled={deleteGameMutation.isLoading || addGameMutation.isLoading}
        >
          <CheckSharpIcon />
        </StyledCompletedButtonIcon>
      </StyledGameCardContent>
    </StyledGameCardContainer>
  ) : null;
}
