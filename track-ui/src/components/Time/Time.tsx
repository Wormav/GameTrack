import React, { useContext, useState } from 'react';
import { UserGamesContext } from '@src/contexts/UserGamesContext';
import { convertTimeHowlongToTime } from '@src/utils/convertFormatsTime';
import { StyledTime, StyledEditIcon } from './time.styles';
import TimeForm from './TimeForm/TimeForm';

interface TimeProps {
  gameId: number;
  gameInUserGames : boolean;
}

export default function Time({ gameId, gameInUserGames }: TimeProps) {
  const [openModal, setOpenModal] = useState(false);

  const { userGames } = useContext(UserGamesContext);

  const game = userGames?.find((g) => g.game_id === gameId);
  const time = game?.game_time?.main_story;

  return (
    <StyledTime>
      {gameInUserGames ? (
        <>
          <h1>Temps de jeu :</h1>
          <StyledEditIcon onClick={() => setOpenModal(true)} />
          {openModal && <TimeForm setOpenModal={setOpenModal} gameId={gameId} />}
          <span>{time ? convertTimeHowlongToTime(time, false) : 'Aucun temps renseigné'}</span>
        </>
      ) : (
        <h1>Ajouter ce jeu pour ajouter un temps de jeu</h1>
      )}
    </StyledTime>
  );
}
