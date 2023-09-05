import React, { useState } from 'react';
import {
  Checkbox, InputLabel, MenuItem, SelectChangeEvent, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import { colorsArray, iconsArray } from '@src/utils/colorsAndIcons';
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
}

export default function ListsSettings({ open, setOpen }: ListsSettingsProps) {
  const { t } = useTranslation(['app', 'common']);

  const [addList, setAddList] = useState(false);
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');

  const handleClickAddList = () => {
    setAddList(true);
  };

  const handleChangeColor = (event: SelectChangeEvent<unknown>) => {
    setColor(event.target.value as string);
  };

  const hancleChangeIcon = (event: SelectChangeEvent<unknown>) => {
    setIcon(event.target.value as string);
  };

  const onClosed = () => {
    setAddList(false);
    setOpen(false);
    setColor('');
    setIcon('');
  };

  return (
    <StyledModal
      open={open}
      onClose={onClosed}
    >
      <StyledBox>
        <Typography id="title" variant="h4" color="white">{t('addIn')}</Typography>
        <StyledFormList>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>Nom de la liste</span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>Nom de la liste 2</span>
          </div>
        </StyledFormList>
        {addList ? (
          <StyledFormNewList>
            <div className="top-container">
              <StyledFormAddList>
                <InputLabel id="color">
                  {' '}
                  {t('color', { ns: 'common' })}
                </InputLabel>
                <StyledSelect value={color} labelId="color" label="color" onChange={handleChangeColor} color="success" variant="filled">
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
                <StyledSelect value={icon} labelId="icon" label="icon" onChange={hancleChangeIcon} color="success" variant="filled">
                  {iconsArray.map((e) => (
                    <MenuItem key={e.name} value={e.name}>
                      {e.icon}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </StyledFormAddList>
            </div>
            <StyledTextField color="success" type="text" label="Nom de la liste" variant="filled" />
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
  );
}
