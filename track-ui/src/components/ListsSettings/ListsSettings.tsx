import React, { useContext, useState } from 'react';
import {
  Checkbox, Typography, Snackbar, Alert, AlertColor,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import axios from '@config/axios.config';
import { List, UserListsContext } from '@src/contexts/UserLists.context';
import {
  StyledBox,
  StyledFormList,
  StyledModal,
} from './listsSettings.styles';
import EditList from '../EditList/EditList';

interface ListsSettingsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gameId : number;
}

interface IAddListForm {
  color: string;
  icon: string;
  name: string;
}

interface IResponseMessage {
  message: string
  status: string
}

export default function ListsSettings({ open, setOpen, gameId }: ListsSettingsProps) {
  const { t } = useTranslation(['app', 'common']);

  const [addList, setAddList] = useState(false);
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);

  const { userLists, updateUserLists, setUpdateUserLists } = useContext(UserListsContext);

  const handleClickAddList = () => {
    setAddList(true);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const {
    reset,
  } = useForm<IAddListForm>();

  const onClosed = () => {
    setAddList(false);
    setOpen(false);
    reset({
      color: '',
      icon: '',
      name: '',
    });
  };

  const handleClickCheckbox = (list: List) => {
    const { name } = list;
    const gameIsInList = list.games.some((g) => g.id === gameId);
    axios
      .post(
        `/user/list/${name}`,
        {
          gameId,
          add: !gameIsInList,
          newListName: list.name,
          backgroundColor: list.backgroundColor,
          icon: list.icon,
        },
        { withCredentials: true },
      )
      .then(() => {
        setResponseMessage(gameIsInList ? { message: t('gameRemovedInList', { ns: 'user' }), status: 'success' } : { message: t('gameAddInList', { ns: 'user' }), status: 'success' });
        setUpdateUserLists(!updateUserLists);
      })
      .catch(() => {
        setResponseMessage({ message: t('errorGameAddInList', { ns: 'user' }), status: 'warning' });
      });
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
            severity={responseMessage.status as AlertColor}
          >
            {responseMessage.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
