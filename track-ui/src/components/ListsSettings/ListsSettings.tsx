import React, { useContext, useState } from 'react';
import {
  Checkbox, Typography, Snackbar, Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import { List, UserListsContext } from '@src/contexts/UserLists.context';
import axios from '@config/axios.config';
import {
  StyledBox,
  StyledFormList,
  StyledModal,
} from './listsSettings.styles';
import EditList from '../EditList/EditList';

interface ListsSettingsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gameId: number;
}

interface UpdateGameInListProps {
  name: string;
  gameId: number;
  add: boolean;
  list: List;
}

interface IResponseMessage {
  message: string;
  status: string;
}

const updateGameInList = async ({
  name, gameId, add, list,
}: UpdateGameInListProps) => {
  const response = await axios.post(
    `/user/list/${name}`,
    {
      gameId,
      add,
      newListName: list.name,
      backgroundColor: list.backgroundColor,
      icon: list.icon,
    },
    { withCredentials: true },
  );
  return response.data;
};

export default function ListsSettings({ open, setOpen, gameId }: ListsSettingsProps) {
  const { t } = useTranslation(['app', 'common']);
  const [addList, setAddList] = useState(false);
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);
  const { userLists } = useContext(UserListsContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(updateGameInList, {
    onSuccess: () => {
      queryClient.invalidateQueries('userLists');
    },
  });

  const handleClickAddList = () => {
    setAddList(true);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const onClosed = () => {
    setAddList(false);
    setOpen(false);
  };

  const handleClickCheckbox = (list: List) => {
    const { name } = list;
    const gameIsInList = list.games.some((g) => g.id === gameId);
    mutation.mutate(
      {
        name, gameId, add: !gameIsInList, list,
      },
      {
        onSuccess: () => {
          setResponseMessage(gameIsInList ? { message: t('gameRemovedInList', { ns: 'user' }), status: 'success' } : { message: t('gameAddInList', { ns: 'user' }), status: 'success' });
        },
        onError: (error) => {
          if (import.meta.env.DEBUG === 'true') {
            // eslint-disable-next-line no-console
            console.error({ message: 'GameDetails', error });
          }
          setResponseMessage({ message: t('errorGameAddInList', { ns: 'user' }), status: 'warning' });
        },
      },
    );
  };

  return (
    <>
      <StyledModal
        open={open}
        onClose={onClosed}
      >
        <StyledBox>
          {userLists && userLists?.length > 0 && (
          <Typography id="title" variant="h4" color="white">{t('addIn')}</Typography>
          )}
          <StyledFormList>
            {userLists
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((list) => (
                <div key={list.name} className="input-container">
                  <Checkbox
                    checked={list.games.some((g) => g.id === gameId)}
                    onClick={() => handleClickCheckbox(list)}
                    className="checkbox"
                  />
                  <span>{list.name}</span>
                </div>
              ))}
          </StyledFormList>
          {addList ? (
            <EditList gameId={gameId} setResponseMessage={setResponseMessage} onClosed={onClosed} requestType="create" />
          ) : (
            <section>
              <AiOutlinePlus className="addList" onClick={handleClickAddList} />
              <Typography id="title" variant="h5" color="white">{t('createList')}</Typography>
            </section>
          )}
        </StyledBox>
      </StyledModal>
      {responseMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!responseMessage}
          autoHideDuration={4000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
          >
            {responseMessage.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
