import styled from '@emotion/styled';
import { ListItem, ListItemIcon } from '@mui/material';
import transientOptions from '@src/styles/utils';

export const StyledListItem = styled(ListItem, transientOptions) <{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? 'var(--textfield-background-hover)' : 'var(--textfield-background)')};
  border-radius: 5px;
  margin-top: 3px;
  justify-content: space-between;

  &:hover {
    background-color: var(--textfield-background-hover);
    cursor: pointer;
  }
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  justify-content: flex-end;
  min-width: 0;
`;
