import React, { useState, useContext } from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { UserListsContext } from '@src/contexts/UserLists.context';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import EditList from '@src/components/EditList/EditList';
import {
  Alert, AlertColor, Button, Snackbar, Typography,
} from '@mui/material';
import { useQueryClient, useMutation } from 'react-query';
import axios from '@config/axios.config';
import {
  StyledBox, StyledBoxDeleteList, StyledButton, StyledDiv, StyledModal, StyledModalDeleteList,
} from './MyLists.styles';

interface IResponseMessage {
  message: string
  status: string
}

export default function MyLists() {
  const { t } = useTranslation(['app', 'user', 'common']);

  const [addList, setAddList] = useState(false);
  const [editList, setEditList] = useState(false);
  const [deleteList, setDeleteList] = useState(false);
  const [listName, setListName] = useState('');
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);

  const { userLists, setUpdateUserLists } = useContext(UserListsContext);
  const queryClient = useQueryClient();

  const onClosed = () => {
    setAddList(false);
    setEditList(false);
    setDeleteList(false);
  };

  const mutation = useMutation(
    (listNameUrl: string) => axios.delete(`/user/list/${encodeURIComponent(listNameUrl)}`, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userLists');
        setUpdateUserLists(!setUpdateUserLists);
        onClosed();
        setResponseMessage({ message: t('succesDeleteList', { ns: 'user' }), status: 'success' });
      },
      onError: (error) => {
        if (import.meta.env.DEBUG === 'true') {
          // eslint-disable-next-line no-console
          console.error({ message: 'MyList', error });
        }
        setResponseMessage({ message: t('errorDeleteList', { ns: 'user' }), status: 'error' });
      },
    },
  );

  const handleClickAddList = () => {
    setAddList(!addList);
  };

  const handleClickEditList = (name : string) => {
    setEditList(!editList);
    setListName(name);
  };

  const handleClickDeleteList = (name : string) => {
    setDeleteList(!deleteList);
    setListName(name);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const handleClickConfirmDeleteList = () => {
    mutation.mutate(listName);
  };

  const orderedLists = userLists?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <StyledDiv>
      <h1>{t('myLists')}</h1>
      <StyledButton onClick={handleClickAddList} variant="contained" type="button">{t('createList')}</StyledButton>
      <StyledModal
        open={addList}
        onClose={onClosed}
      >
        <StyledBox>
          <EditList onClosed={onClosed} setResponseMessage={setResponseMessage} requestType="create" />
        </StyledBox>
      </StyledModal>
      <section>
        <div id="container">
          {orderedLists?.map((l) => (
            <div id="card-container" key={l.id}>
              <div id="edit-container">
                <FaEdit onClick={() => handleClickEditList(l.name)} />
                <AiTwotoneDelete onClick={() => handleClickDeleteList(l.name)} />
              </div>
              <ListCard size="sm" id={l.id} backgroundColor={l.backgroundColor} icon={l.icon} />
            </div>
          ))}
          <StyledModal
            open={editList}
            onClose={onClosed}
          >
            <StyledBox>
              <EditList listName={listName} setResponseMessage={setResponseMessage} onClosed={onClosed} requestType="edit" />
            </StyledBox>
          </StyledModal>
          <StyledModalDeleteList
            open={deleteList}
            onClose={onClosed}
          >
            <StyledBoxDeleteList>
              <Typography id="title" variant="h5" color="white">{t('confirmDeleteList', { ns: 'user' })}</Typography>
              <div>
                <Button onClick={() => handleClickDeleteList('')} disabled={mutation.isLoading} variant="contained" color="error" type="button">{t('cancel', { ns: 'common' })}</Button>
                <Button onClick={handleClickConfirmDeleteList} disabled={mutation.isLoading} variant="contained" color="success" type="button">{t('delete', { ns: 'common' })}</Button>
              </div>
            </StyledBoxDeleteList>
          </StyledModalDeleteList>
        </div>
      </section>
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
    </StyledDiv>
  );
}
