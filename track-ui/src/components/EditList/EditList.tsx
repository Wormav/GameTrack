import React, { useContext, useState } from 'react';
import axios from '@config/axios.config';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { t } from 'i18next';
import { InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import { colorObject, iconObject } from '@src/utils/colorsAndIcons';
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

interface IApiError {
  response: {
    data: {
      error: string;
    };
  };
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

  const { setUpdateUserLists } = useContext(UserListsContext);

  const {
    handleSubmit,
    register,
  } = useForm<IAddListForm>();

  const createListMutation = useMutation(
    (newList: IAddListForm) => axios.put('/user/list/', {
      listName: newList.name,
      backgroundColor: newList.color,
      icon: newList.icon,
      gameId,
    }, { withCredentials: true }),
    {
      onSuccess: () => {
        setResponseMessage({ message: t('sucessAddList', { ns: 'user' }), status: 'success' });
        setUpdateUserLists(true);
        if (onClosed) {
          onClosed();
        }
      },
      onError: (err: IApiError) => {
        setResponseMessage(err.response.data.error === 'List name already exists'
          ? { message: t('listAlreadyExist', { ns: 'user' }), status: 'warning' }
          : { message: t('errorAddList', { ns: 'user' }), status: 'error' });
      },
    },
  );

  const editListMutation = useMutation(
    (updatedList: IAddListForm) => axios.post(`/user/list/${encodeURIComponent(listName || '')}`, {
      newListName: updatedList.name,
      backgroundColor: updatedList.color,
      icon: updatedList.icon,
    }, { withCredentials: true }),
    {
      onSuccess: () => {
        setResponseMessage({ message: t('succesEditList', { ns: 'user' }), status: 'success' });
        setUpdateUserLists(true);
        if (onClosed) {
          onClosed();
        }
      },
      onError: () => {
        setResponseMessage({ message: t('errorEditList', { ns: 'user' }), status: 'error' });
      },
    },
  );

  const handleChangeColor = (event: SelectChangeEvent<unknown>) => {
    setColor(event.target.value as string);
  };

  const handleChangeIcon = (event: SelectChangeEvent<unknown>) => {
    setIcon(event.target.value as string);
  };

  const onSubmit: SubmitHandler<IAddListForm> = (data) => {
    if (requestType === 'create') {
      createListMutation.mutate(data);
    } else if (!data.name || !data.color || !data.icon) {
      setResponseMessage({ message: t('errorEditList', { ns: 'user' }), status: 'error' });
    } else {
      editListMutation.mutate(data);
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
      <StyledButton disabled={createListMutation.isLoading} variant="contained" type="submit">{requestType === 'create' ? t('createTheList', { ns: 'common' }) : t('modifyTheList', { ns: 'common' })}</StyledButton>
    </StyledFormNewList>
  );
}

EditList.defaultProps = {
  gameId: undefined,
  onClosed: undefined,
  listName: undefined,
};

export default EditList;
