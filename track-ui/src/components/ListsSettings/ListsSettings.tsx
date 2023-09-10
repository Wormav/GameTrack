import React, { useContext, useState } from 'react';
import {
  Checkbox, InputLabel, MenuItem, SelectChangeEvent, Typography, Snackbar, Alert, AlertColor,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import { colorsArray, iconsArray } from '@src/utils/colorsAndIcons';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '@config/axios.config';
import { List, UserListsContext } from '@src/contexts/UserLists.context';
import {
  StyledBox,
  StyledButton,
  StyledFormAddList,
  StyledFormList,
  StyledFormNewList,
  StyledModal,
  StyledSelect,
  StyledTextField,
} from './listsSettings.styles';
import SelectColorItem from '../SelectColorItem/SelectColorItem';

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
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');
  const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);

  const { userLists, updateUserLists, setUpdateUserLists } = useContext(UserListsContext);

  const handleClickAddList = () => {
    setAddList(true);
  };

  const handleChangeColor = (event: SelectChangeEvent<unknown>) => {
    setColor(event.target.value as string);
  };

  const handleChangeIcon = (event: SelectChangeEvent<unknown>) => {
    setIcon(event.target.value as string);
  };

  const handleCloseError = () => {
    setResponseMessage(null);
  };

  const {
    handleSubmit,
    register,
    reset,
  } = useForm<IAddListForm>();

  const onClosed = () => {
    setAddList(false);
    setOpen(false);
    setColor('');
    setIcon('');
    reset({
      color: '',
      icon: '',
      name: '',
    });
  };

  const onSubmitAddList: SubmitHandler<IAddListForm> = (data) => {
    axios
      .put(
        '/user/list/',
        {
          listName: data.name,
          backgroundColor: data.color,
          icon: data.icon,
          gameId,
        },
        { withCredentials: true },
      )
      .then(() => {
        setResponseMessage({ message: t('sucessAddList', { ns: 'user' }), status: 'success' });
        setUpdateUserLists(!updateUserLists);
        onClosed();
      })
      .catch((err) => {
        setResponseMessage(err.response.data.error === 'List name already exists'
          ? { message: t('listAlreadyExist', { ns: 'user' }), status: 'warning' }
          : { message: t('errorAddList', { ns: 'user' }), status: 'error' });
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
            <StyledFormNewList onSubmit={handleSubmit(onSubmitAddList)}>
              <div className="top-container">
                <StyledFormAddList>
                  <InputLabel id="color">
                    {' '}
                    {t('color', { ns: 'common' })}
                  </InputLabel>
                  <StyledSelect {...register('color')} value={color} labelId="color" label="color" onChange={handleChangeColor} color="success" variant="filled">
                    {colorsArray.map((c) => (
                      <MenuItem key={c.name} value={c.name}>
                        <SelectColorItem color={c.hex} />
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </StyledFormAddList>
                <StyledFormAddList>
                  <InputLabel id="icon">
                    {' '}
                    {t('icon', { ns: 'common' })}
                  </InputLabel>
                  <StyledSelect {...register('icon')} value={icon} labelId="icon" label="icon" onChange={handleChangeIcon} color="success" variant="filled">
                    {iconsArray.map((e) => (
                      <MenuItem key={e.name} value={e.name}>
                        {e.icon}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </StyledFormAddList>
              </div>
              <StyledTextField {...register('name')} color="success" type="text" label="Nom de la liste" variant="filled" />
              <StyledButton variant="contained" type="submit">{t('createTheList', { ns: 'common' })}</StyledButton>
            </StyledFormNewList>
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
