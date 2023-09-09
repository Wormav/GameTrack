import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import axios from '@config/axios.config';
import { UseQueryResult, useQuery } from 'react-query';
import GameCard from '@components/GameCard/GameCard';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import isInUserGames from '@src/utils/games';
import { ErrorContext } from '@src/contexts/ErrorContext';
import Time from '@src/components/Time/Time';
import { useTranslation } from 'react-i18next';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ListsSettings from '@src/components/ListsSettings/ListsSettings';
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
  const { t } = useTranslation(['game']);
  const [gameInUserGames, setGameInUserGames] = useState(false);
  const [settignsOpen, setSettingsOpen] = useState(false);

  const { id } = useParams();
  const gameId = parseInt(id ?? '-1', 10);

  const {
    setUpdateUserGames, updateUserGames, userGames,
  } = useContext(UserGamesContext);
  const { setError } = useContext(ErrorContext);

  const games = userGames?.map((g) => g.game);

  const gameInUserGamesContext = userGames?.find((g) => g.game_id === gameId);
  const gameDone = gameInUserGamesContext?.done;
  const time = gameInUserGamesContext?.game_time?.main_story;

  const checkGameInUserGames = useCallback(() => {
    if (games && id) {
      return isInUserGames(games, id ? parseInt(id, 10) : -1);
    }

    return false;
  }, [games, id]);

  useEffect(() => {
    if (games) {
      setGameInUserGames(checkGameInUserGames());
    }
  }, [games, checkGameInUserGames]);

  const getGame = async () => {
    try {
      const res = await axios.get(
        `games/game/${id}`,
        { withCredentials: true },
      );
      return res;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setError(true);
      return null;
    }
  };

  const handleClickSettingIcon = () => {
    setSettingsOpen(!settignsOpen);
  };

  const { data, error, isLoading }: UseQueryResult<GameData, unknown> = useQuery({
    queryKey: ['game', id],
    queryFn: getGame,
  });

  const handleClickAddGame = async () => {
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
          setGameInUserGames(true);
          setUpdateUserGames(!updateUserGames);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError(true);
        });
    }
  };

  const handleClickEndGame = async () => {
    if (time) {
      axios.post(
        `/user/game/${gameId}/time`,
        {
          time: {
            mainStory: time,
          },
          done: !gameDone,
        },
        { withCredentials: true },
      )
        .then(() => {
          setUpdateUserGames(!updateUserGames);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          setError(true);
        });
    } else {
      axios.post(
        `/user/game/${gameId}/time`,
        {
          done: !gameDone,
        },
        { withCredentials: true },
      )
        .then(() => {
          setUpdateUserGames(!updateUserGames);
        })
        .catch((err) => {
          if (err.response && err.response.status !== 444) {
          // eslint-disable-next-line no-console
            console.error('ici');
            setError(true);
          }
          setUpdateUserGames(!updateUserGames);
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
          <section>
            <GameCard $clickable={false} size="md" id={parseInt(id, 10)} />
            <div className="dashboard">
              <div className="settingIcon-container">
                <BsThreeDotsVertical onClick={handleClickSettingIcon} className="settingIcon" />
                <ListsSettings open={settignsOpen} setOpen={setSettingsOpen} gameId={gameId} />
              </div>
              <div className="container-top">
                <h2>
                  {`${t('gender', { count: 2 })} :`}
                </h2>
                <div>
                  {data?.data.genre && data.data.genre.length > 0
                    ? data.data.genre.slice(0, 3).map((e) => <span key={e.id}>{e.name}</span>)
                    : <span>{t('undefined')}</span>}
                </div>

                <h2>
                  {`${t('platform', { count: 2 })} :`}

                </h2>
                <div>
                  {data?.data.platform && data.data.platform.length > 0
                    ? data.data.platform.map((e) => (
                      <span key={e.id}>{e.name}</span>
                    )) : <span>{t('undefined')}</span>}
                </div>
              </div>
              <div className="container-bottom">
                <div className="element">
                  <Time gameId={gameId} gameInUserGames={gameInUserGames} />
                </div>
                <div className="element">
                  <StyledButton onClick={handleClickAddGame} variant="contained" $background={gameInUserGames}>{gameInUserGames ? t('remove') : t('add')}</StyledButton>
                  {gameInUserGames && (
                    <StyledButton onClick={handleClickEndGame} variant="contained" $background={gameDone}>{gameDone ? t('not_done') : t('done')}</StyledButton>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="description">
            <div>
              <h2>{t('about')}</h2>
              <p>{data?.data.description ? data.data.description : t('undefined') }</p>
            </div>
          </section>
        </main>
      </StyledContainer>
    ) : null
  );
}
