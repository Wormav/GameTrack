import React from 'react';
import { AiOutlineUnorderedList, AiTwotoneStar } from 'react-icons/ai';
import { BiJoystickAlt } from 'react-icons/bi';
import { BsFillEmojiSmileFill, BsJoystick } from 'react-icons/bs';

export const colorObject: { [key: string]: string } = {
  green: '#187B4F',
  blue: '#2510e6',
  red: '#a11c15',
  yellow: '#c4c708',
  orange: '#c9690e',
};

export const iconObject: { [key: string]: React.ReactNode } = {
  joystick: <BiJoystickAlt />,
  joystick2: <BsJoystick />,
  list: <AiOutlineUnorderedList />,
  star: <AiTwotoneStar />,
  emoji: <BsFillEmojiSmileFill />,
};
