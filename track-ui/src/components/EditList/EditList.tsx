import React, { useContext, useState } from 'react';
import axios from '@config/axios.config';
import { SubmitHandler, useForm } from 'react-hook-form';
import { t } from 'i18next';
import { InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import {
  colorObject, iconObject,
} from '@src/utils/colorsAndIcons';
import { UserListsContext } from '@src/contexts/UserLists.context';
import {
  StyledButton, StyledFormAddList, StyledFormNewList, StyledSelect, StyledTextField,
} from './editList.styles';
import SelectColorItem from '../SelectColorItem/SelectColorItem';

interface IAddListForm {
  color: string;
  icon: string;
  name: string;
}

interface IResponseMessage {
  message: string
  status: string
}

interface EditListProps {
  gameId?: number
  listName?: string
  setResponseMessage: React.Dispatch<React.SetStateAction<IResponseMessage | null>>;
  onClosed?: () => void;
  requestType: string;
}

function EditList({
  gameId, listName, setResponseMessage, onClosed, requestType,
}: EditListProps) {
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');

  const { updateUserLists, setUpdateUserLists } = useContext(UserListsContext);

  const {
    handleSubmit,
    register,
  } = useForm<IAddListForm>();

  const handleChangeColor = (event: SelectChangeEvent<unknown>) => {
    setColor(event.target.value as string);
  };

  const handleChangeIcon = (event: SelectChangeEvent<unknown>) => {
    setIcon(event.target.value as string);
  };

  const onSubmit: SubmitHandler<IAddListForm> = (data) => {
    if (requestType === 'create') {
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
          if (onClosed) {
            onClosed();
          }
        })
        .catch((err) => {
          setResponseMessage(err.response.data.error === 'List name already exists'
            ? { message: t('listAlreadyExist', { ns: 'user' }), status: 'warning' }
            : { message: t('errorAddList', { ns: 'user' }), status: 'error' });
        });
    } else if (!data.name || !data.color || !data.icon) {
      setResponseMessage({ message: t('errorEditList', { ns: 'user' }), status: 'error' });
    } else {
      axios
        .post(
          `/user/list/${listName}`,
          {
            newListName: data.name,
            backgroundColor: data.color,
            icon: data.icon,
          },
          { withCredentials: true },
        )
        .then(() => {
          setResponseMessage({ message: t('succesEditList', { ns: 'user' }), status: 'success' });
          setUpdateUserLists(!updateUserLists);
          if (onClosed) {
            onClosed();
          }
        })
        .catch(() => {
          setResponseMessage({ message: t('errorEditList', { ns: 'user' }), status: 'error' });
        });
    }
  };

  return (
    <StyledFormNewList onSubmit={handleSubmit(onSubmit)}>
      <div className="top-container">
        <StyledFormAddList>
          <InputLabel id="color">
            {t('color', { ns: 'common' })}
          </InputLabel>
          <StyledSelect {...register('color')} value={color} labelId="color" label="color" onChange={handleChangeColor} color="success" variant="filled">
            {Object.keys(colorObject).map((colorName) => (
              <MenuItem key={colorName} value={colorName}>
                <SelectColorItem color={colorObject[colorName]} />
              </MenuItem>
            ))}
          </StyledSelect>
        </StyledFormAddList>
        <StyledFormAddList>
          <InputLabel id="icon">
            {t('icon', { ns: 'common' })}
          </InputLabel>
          <StyledSelect {...register('icon')} value={icon} labelId="icon" label="icon" onChange={handleChangeIcon} color="success" variant="filled">
            {Object.keys(iconObject).map((iconName) => (
              <MenuItem key={iconName} value={iconName}>
                {iconObject[iconName]}
              </MenuItem>
            ))}
          </StyledSelect>
        </StyledFormAddList>
      </div>
      <StyledTextField {...register('name')} color="success" type="text" label="Nom de la liste" variant="filled" />
      <StyledButton variant="contained" type="submit">{requestType === 'create' ? t('createTheList', { ns: 'common' }) : t('modifyTheList', { ns: 'common' })}</StyledButton>
    </StyledFormNewList>
  );
}

EditList.defaultProps = {
  gameId: undefined,
  onClosed: undefined,
  listName: undefined,
};

export default EditList;
