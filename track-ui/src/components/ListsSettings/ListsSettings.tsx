import React, { useState } from 'react';
import {
  Checkbox, InputLabel, MenuItem, SelectChangeEvent, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus, AiOutlineUnorderedList, AiTwotoneStar } from 'react-icons/ai';
import { BiJoystickAlt } from 'react-icons/bi';
import { BsFillEmojiSmileFill, BsJoystick } from 'react-icons/bs';
import {
  StyledBox,
  StyledButton,
  StyledFormAddList,
  StyledFormList,
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
            <span>test</span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test</span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test mes couilles en skys</span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
          <div className="input-container">
            <Checkbox className="checkbox" />
            <span>test iudsciudic uhs hidhzehi jbdcbcdjcd jedjhdeuh jdjhbh </span>
          </div>
        </StyledFormList>
        {addList ? (
          <div className="form-addList-container">
            <StyledFormAddList>
              <div className="first-section">
                <InputLabel id="color">
                  {' '}
                  {t('color', { ns: 'common' })}
                </InputLabel>
                <StyledSelect value={color} labelId="color" label="color" onChange={handleChangeColor} color="success" variant="filled">
                  <MenuItem value="#187B4F">
                    <SelectColorItem color="#187B4F" />
                  </MenuItem>
                  <MenuItem value="#2510e6">
                    <SelectColorItem color="#2510e6" />
                  </MenuItem>
                  <MenuItem value="#c4c708">
                    <SelectColorItem color="#c4c708" />
                  </MenuItem>
                  <MenuItem value="#a11c15">
                    <SelectColorItem color="#a11c15" />
                  </MenuItem>
                  <MenuItem value="#c9690e">
                    <SelectColorItem color="#c9690e" />
                  </MenuItem>
                </StyledSelect>
                <InputLabel id="icon">
                  {' '}
                  {t('icon', { ns: 'common' })}
                </InputLabel>
                <StyledSelect value={icon} labelId="icon" label="icon" onChange={hancleChangeIcon} color="success" variant="filled">
                  <MenuItem value="j  oystick">
                    <BiJoystickAlt />
                  </MenuItem>
                  <MenuItem value="joystick2">
                    <BsJoystick />
                  </MenuItem>
                  <MenuItem value="list">
                    <AiOutlineUnorderedList />
                  </MenuItem>
                  <MenuItem value="star">
                    <AiTwotoneStar />
                  </MenuItem>
                  <MenuItem value="emoji">
                    <BsFillEmojiSmileFill />
                  </MenuItem>
                </StyledSelect>
              </div>
              <StyledTextField color="success" type="text" label="Nom de la liste" variant="filled" />
              <StyledButton variant="contained" type="submit">{t('createTheList', { ns: 'common' })}</StyledButton>
            </StyledFormAddList>
          </div>
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
