import React from 'react';
import { AiOutlineUnorderedList, AiTwotoneStar } from 'react-icons/ai';
import { BiJoystickAlt } from 'react-icons/bi';
import { BsFillEmojiSmileFill, BsJoystick } from 'react-icons/bs';

export const colorsArray = [
  { name: 'green', hex: '#187B4F' },
  { name: 'blue', hex: '#2510e6' },
  { name: 'red', hex: '#a11c15' },
  { name: 'yellow', hex: '#c4c708' },
  { name: 'orange', hex: '#c9690e' },
];

export const iconsArray = [
  { name: 'joystick', icon: <BiJoystickAlt /> },
  { name: 'joystick2', icon: <BsJoystick /> },
  { name: 'list', icon: <AiOutlineUnorderedList /> },
  { name: 'star', icon: <AiTwotoneStar /> },
  { name: 'emoji', icon: <BsFillEmojiSmileFill /> },
];
