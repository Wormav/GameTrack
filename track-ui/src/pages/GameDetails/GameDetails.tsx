import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@config/axios.config';
import { UseQueryResult, useQuery } from 'react-query';
import GameCard from '@components/GameCard/GameCard';
import { StyledContainer, StyledButton } from './gameDetails.styles';

interface GameData {
  data: {
    cover: string;
    description: string;
    game_id: number;
    genre: { id: number, name: string }[];
    id: number;
    multiplayer: boolean;
    platform: { id: number, name: string }[];
    publisher:[];
    release_date: [];
    title: string;
    update_at: string;
  }
}

export default function GameDetails() {
  const [gameInUserGames, setGameInUserGames] = useState(false);

  const { id } = useParams();

  const getGame = async () => {
    const res = await axios.get(
      `games/game/${id}`,
      { withCredentials: true },
    );
    return res;
  };

  const { data, error, isLoading }: UseQueryResult<GameData, unknown> = useQuery('game', getGame);

  const handleClick = async (gameId: number) => {
    if (!gameInUserGames) {
      axios.post(
        '/games/addgame',
        {
          gameId,
        },
        { withCredentials: true },
      )
        .then(() => {
          setGameInUserGames(true);
        });
    } else {
      axios.delete('/games/deletegame', {
        params: {
          gameId,
        },
        withCredentials: true,
      })
        .then(() => {
          setGameInUserGames(false);
        });
    }
  };

  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>Une erreur est survenue</span>;

  return (
    id ? (
      <StyledContainer>
        <h1>{data?.data.title}</h1>
        <main>
          <GameCard clickable={false} size="md" isCompleted={gameInUserGames} id={parseInt(id, 10)} />
          <section>
            <p>{data?.data.description}</p>
            <div>
              {data?.data.genre.slice(0, 3).map((e) => <span key={e.id}>{e.name}</span>)}
            </div>
            <div>
              {data?.data.platform
                .filter(
                  (value, index, self) => self.findIndex((p) => p.name === value.name) === index,
                )
                .map((e) => (
                  <span key={e.id}>{e.name}</span>
                ))}
            </div>
            <StyledButton onClick={() => handleClick(parseInt(id, 10))} variant="contained" $background={gameInUserGames}>{gameInUserGames ? 'Retirer' : 'Ajouter'}</StyledButton>
          </section>
        </main>
      </StyledContainer>
    ) : null
  );
}
