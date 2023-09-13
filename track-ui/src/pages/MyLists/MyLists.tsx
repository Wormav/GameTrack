import React, { useContext, useState } from 'react';
import ListCard from '@src/components/ListCard/ListCard';
import { useTranslation } from 'react-i18next';
import { UserListsContext } from '@src/contexts/UserLists.context';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import EditList from '@src/components/EditList/EditList';

import { Alert, AlertColor, Snackbar } from '@mui/material';
import {
  StyledBox, StyledButton, StyledDiv, StyledModal,
} from './MyLists.styles';

interface IResponseMessage {
  message: string
  status: string
}

export default function MyLists() {
  const { t } = useTranslation(['app']);

  const [addList, setAddList] = useState(false);
  const [editList, setEditList] = useState(false);
  const [listName, setListName] = useState('');
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);

  const onClosed = () => {
    setAddList(false);
    setEditList(false);
  };

  const handleClickAddList = () => {
    setAddList(!addList);
  };

  const handleClickEditList = (name : string) => {
    setEditList(!editList);
    setListName(name);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const { userLists } = useContext(UserListsContext);
  return (
    <StyledDiv>
      <h1>{t('myLists')}</h1>
      <StyledButton onClick={handleClickAddList} variant="contained" type="button">{t('createList')}</StyledButton>
      <StyledModal
        open={addList}
        onClose={onClosed}
      >
        <StyledBox>
          <EditList setResponseMessage={setResponseMessage} requestType="create" />
        </StyledBox>
      </StyledModal>

      <div id="container">
        {userLists?.slice(0, 9).sort((a, b) => a.name.localeCompare(b.name)).map((l) => (
          <div id="card-container" key={l.id}>
            <div id="edit-container">
              <FaEdit onClick={() => handleClickEditList(l.name)} />
              <AiTwotoneDelete />
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
      </div>
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
