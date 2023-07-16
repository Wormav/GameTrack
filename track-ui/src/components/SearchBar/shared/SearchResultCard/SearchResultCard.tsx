import React from 'react';
import {
  Avatar, ListItemAvatar, ListItemText, Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { StyledListItem, StyledListItemIcon } from './search-result-card.styles';

interface ISearchResultCardProps {
  id: number;
  cover: string;
  title: string;
  alreadyAdded?: boolean;
  onClick: (id: number) => void;
  selected: boolean;
}

export default function SearchResultCard({
  id, cover, title, alreadyAdded = false, onClick, selected,
}: ISearchResultCardProps) {
  return (
    <StyledListItem onClick={() => onClick(id)} $selected={selected}>
      <ListItemAvatar>
        <Avatar
          alt="game cover"
          src={cover}
          variant="square"
        />
      </ListItemAvatar>
      <ListItemText secondary={title} />
      {alreadyAdded && (
        <Tooltip title="déja ajouté">

          <StyledListItemIcon>
            <CheckCircleIcon color="success" />
          </StyledListItemIcon>
        </Tooltip>
      )}
    </StyledListItem>
  );
}

SearchResultCard.defaultProps = {
  alreadyAdded: false,
};
