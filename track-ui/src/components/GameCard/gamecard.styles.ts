import styled from '@emotion/styled';
import { IconButton, Skeleton } from '@mui/material';
import transientOptions from '@styles/utils';

export const StyledGameCardContainer = styled('div', transientOptions)<{ width: string, height: string, cover:string, $clickable: boolean }>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 15px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: ${(props) => `url(${props.cover})`};
    background-size: cover;
    object-fit: cover;

    &:hover{
      ${(props) => (props.$clickable ? 'cursor : pointer ;' : '')}
    }
`;

export const StyledGameCardContent = styled('div', transientOptions)<{ $titleSize: string }>`
height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  background-color: #00000040;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;


  span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-width: 70%;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  margin: 0 auto;
  font-weight: 500;
  font-size: ${(props) => props.$titleSize};
  color: white;
  }
`;

export const StyledCompletedButtonIcon = styled(IconButton, transientOptions) <{ $backgroundColor?: string, $isCompleted: boolean, height:string }>`
  padding: 0;
  background-color: ${(props) => (props.$backgroundColor ?? '#919191b5')};
  margin-bottom: 4px;
  margin-right: 7px;
  width: ${(props) => (props.height === '300px' ? '30px' : '50px')};
  height: ${(props) => (props.height === '300px' ? '30px' : '50px')};



  svg {
    color: whitesmoke;
    opacity: ${(props) => (props.$isCompleted ? 1 : 0)};
  }
`;

export const StyledSkeleton = styled(Skeleton)`
 border-radius: 15px; 
`;
