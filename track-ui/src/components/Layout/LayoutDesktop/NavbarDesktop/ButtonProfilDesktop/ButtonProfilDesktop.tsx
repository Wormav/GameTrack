import React, { useContext } from 'react';
import { UserContext } from '@src/contexts/UserContext';
import { StyledAvatar } from './buttonProfilDesktop.styles';

interface IButtonProfilDesktop {
  onClick : ()=>void
}

export default function ButtonProfilDesktop({ onClick }: IButtonProfilDesktop) {
  const { user } = useContext(UserContext);

  return (
    <StyledAvatar onClick={onClick} alt={user?.username} src={`${import.meta.env.VITE_API_URL}/user/avatar?filename=${user?.avatar ?? ''}`} />
  );
}
