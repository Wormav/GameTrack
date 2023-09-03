import React from 'react';
import StyledContainer from './selectColorItem.styles';

interface SelectColorItemProps {
  color: string;
}

export default function SelectColorItem({ color } : SelectColorItemProps) {
  return (
    <StyledContainer $color={color} />
  );
}
