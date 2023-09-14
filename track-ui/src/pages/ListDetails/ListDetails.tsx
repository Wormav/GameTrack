import GameCard from '@src/components/GameCard/GameCard';
import { UserListsContext } from '@src/contexts/UserLists.context';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import {
  Alert, AlertColor, Button, Snackbar, Typography,
} from '@mui/material';
import { t } from 'i18next';
import axios from '@config/axios.config';
import { StyledBoxDeleteGame, StyledDiv, StyledModalDeleteGame } from './listDetails.styles';

interface IResponseMessage {
  message: string
  status: string
}

export default function ListDetails() {
  const [deleteGame, setDeleteGame] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);

  const { id } = useParams();
  const ListId = parseInt(id ?? '-1', 10);

  const handleClickDeleteGame = (gameIdData : number) => {
    setDeleteGame(!deleteGame);
    setGameId(gameIdData);
  };

  const onClosed = () => {
    setDeleteGame(false);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const { userLists, updateUserLists, setUpdateUserLists } = useContext(UserListsContext);

  const list = userLists?.find((g) => g.id === ListId);
  const games = list?.games;

  const deleteGameInList = async () => {
    try {
      await axios.post(`/user/list/${list?.name}`, {
        gameId,
        add: false,
      }, { withCredentials: true });
      setUpdateUserLists(!updateUserLists);
      setResponseMessage({ message: t('succesDeleteGameInList', { ns: 'user' }), status: 'success' });
      onClosed();
    } catch (err) {
      setResponseMessage({ message: t('errorDeleteGameInList', { ns: 'user' }), status: 'error' });
    }
  };

  return (
    <StyledDiv>
      <h1>{ list?.name }</h1>
      <div id="container">
        {games?.map((g) => (
          <div id="card-container" key={g.id}>
            <AiTwotoneDelete onClick={() => handleClickDeleteGame(g.id)} />
            <GameCard $clickable size="sm" id={g.id} />
          </div>
        ))}
        <StyledModalDeleteGame
          open={deleteGame}
          onClose={onClosed}
        >
          <StyledBoxDeleteGame>
            <Typography id="title" variant="h5" color="white">{t('confirmDeleteGameInList', { ns: 'user' })}</Typography>
            <div>
              <Button onClick={onClosed} variant="contained" color="error" type="button">{t('cancel', { ns: 'common' })}</Button>
              <Button onClick={deleteGameInList} variant="contained" color="success" type="button">{t('delete', { ns: 'common' })}</Button>
            </div>
          </StyledBoxDeleteGame>
        </StyledModalDeleteGame>
        {responseMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!responseMessage}
          autoHideDuration={4000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity={responseMessage.status as AlertColor}
          >
            {responseMessage.message}
          </Alert>
        </Snackbar>
        )}
      </div>
    </StyledDiv>
  );
}
