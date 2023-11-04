import React, { useContext, useState } from 'react';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import { convertTimeHowlongToTime } from '@src/utils/convertFormatsTime';
import { useTranslation } from 'react-i18next';
import { StyledTime, StyledEditIcon } from './time.styles';
import TimeForm from './TimeForm/TimeForm';

interface TimeProps {
  gameId: number;
  gameInUserGames: boolean;
}

export default function Time({ gameId, gameInUserGames }: TimeProps) {
  const { t } = useTranslation(['game']);
  const [openModal, setOpenModal] = useState(false);

  const { userGames, setUpdateUserGames } = useContext(UserGamesContext);

  const game = userGames?.find((g) => g.game_id === gameId);
  const time = game?.game_time?.main_story;

  return (
    <StyledTime>
      {gameInUserGames ? (
        <>
          <h1>{`${t('gameTime')} :`}</h1>
          <StyledEditIcon onClick={() => setOpenModal(true)} />
          {openModal && (
            <TimeForm
              setOpenModal={setOpenModal}
              gameId={gameId}
              setUpdateUserGames={setUpdateUserGames}
            />
          )}
          <span>{time ? convertTimeHowlongToTime(time, false) : t('emptyGameTime')}</span>
        </>
      ) : (
        <h1>{t('addGameToBeAbleToAddTime')}</h1>
      )}
    </StyledTime>
  );
}
