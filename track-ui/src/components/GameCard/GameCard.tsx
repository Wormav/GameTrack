import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import axios from '@config/axios.config';
import { useQuery, UseQueryResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import { ErrorContext } from '@src/contexts/ErrorContext';
import {
  StyledCompletedButtonIcon,
  StyledGameCardContainer,
  StyledGameCardContent,
  StyledSkeleton,
} from './gameCard.styles';

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

export default function GameCard({
  size,
  id,
  $clickable,
}: GameCardProps) {
  const [gameInUserGames, setGameInUserGames] = useState(false);

  const { setUpdateUserGames, updateUserGames, userGames } = useContext(UserGamesContext);
  const { setError } = useContext(ErrorContext);

  const games = userGames?.map((g) => g.game);

  const checkGameInUserGames = useCallback(() => {
    if (games) {
      return games.some((g) => g.id === id);
    }
    return false;
  }, [games, id]);

  useEffect(() => {
    if (games) {
      setGameInUserGames(checkGameInUserGames());
    }
  }, [games, checkGameInUserGames]);

  const navigate = useNavigate();

  const getGame = async () => {
    const res = await axios.get(`games/game/${id}`, { withCredentials: true });
    return res;
  };

  const onClickCard = () => {
    if ($clickable) {
      navigate(`/game/${id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleClickButton = async (gameId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!gameInUserGames) {
      axios.post(
        '/user/game',
        {
          gameId,
        },
        { withCredentials: true },
      )
        .then(() => {
          setGameInUserGames(true);
          setUpdateUserGames(!updateUserGames);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError(true);
        });
    } else {
      axios.delete('/user/game', {
        params: {
          gameId,
        },
        withCredentials: true,
      })
        .then(() => {
          setGameInUserGames(false);
          setUpdateUserGames(!updateUserGames);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError(true);
        });
    }
  };

  interface GameData {
    data: {
      cover: string;
      description: string;
      game_id: number;
      genre: [];
      id: number;
      multiplayer: boolean;
      platform: [];
      publisher: [];
      release_date: [];
      title: string;
      update_at: string;
    };
  }

  const { data, error, isLoading }: UseQueryResult<GameData, unknown> = useQuery(['game', id], getGame);

  const getCardOptions = (s: string) => {
    switch (s.toUpperCase()) {
      case GameCardSize[GameCardSize.SM]:
        return { height: '300px', width: '200px', title_size: '0.8rem' };
      case GameCardSize[GameCardSize.MD]:
        return { height: '466px', width: '300px', title_size: '1rem' };
      case GameCardSize[GameCardSize.XL]:
        return { height: '776px', width: '500px', title_size: '1.3rem' };
      default:
        return { height: '466px', width: '300px', title_size: '1rem' };
    }
  };
  const cardOptions = getCardOptions(size);

  if (error) return <div>Une erreur est survenue</div>;

  if (isLoading) return <StyledSkeleton variant="rectangular" width={cardOptions.width} height={cardOptions.height} />;

  return data ? (
    <StyledGameCardContainer
      width={cardOptions.width}
      height={cardOptions.height}
      cover={data.data.cover}
      $clickable={$clickable}
      onClick={onClickCard}
    >
      <StyledGameCardContent $titleSize={cardOptions.title_size}>
        <span className="title">{data.data.title}</span>
        <StyledCompletedButtonIcon
          $backgroundColor={gameInUserGames ? 'darkgreen' : undefined}
          $inUserGames={gameInUserGames}
          onClick={(event) => handleClickButton(id, event)}
          height={cardOptions.height}
        >
          <CheckSharpIcon />
        </StyledCompletedButtonIcon>
      </StyledGameCardContent>
    </StyledGameCardContainer>
  ) : null;
}
