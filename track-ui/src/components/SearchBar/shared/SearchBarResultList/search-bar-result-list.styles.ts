import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import transientOptions from '@src/styles/utils';

export const StyledResultContainer = styled(Popover, transientOptions)<{ $fullSize: boolean }>`

  .MuiPaper-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0 3px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    min-height: 50px;
    max-height: ${(props) => (props.$fullSize ? '70%' : '250px')};
    width: ${(props) => (props.$fullSize ? '83%' : '250px')};
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }


    #result-list {
      width: 100%;
      overflow: auto;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    }
`;

export default StyledResultContainer;
