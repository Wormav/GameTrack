import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { useLocation } from 'react-router-dom';
import StyledSearchBar from './search-bar-input.styles';
import { SearchBarAction, SearchBarActionTypes } from '../../reducer/searchbarReducer';

interface SearchBarInputProps {
  value: string;

  openResults: boolean;
  onSubmit: () => void;
  dispatchReducer: (action: SearchBarAction) => void;
  showPrefix?: boolean;
  refInput: React.RefObject<HTMLInputElement>;
  fixedWidth?: boolean;
}

export default function SearchBarInput({
  value,
  openResults,
  onSubmit,
  refInput,
  dispatchReducer,
  showPrefix = true,
  fixedWidth = true,
}: SearchBarInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const submitRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const mouseLocationRef = useRef({ x: 0, y: 0 });

  const handleClick = () => {
    if (isFocused) { return; } // a voir
    setIsFocused(true);
    refInput.current?.focus({ preventScroll: true });
  };

  const handleClose = () => {
    if (refInput.current
      && mouseLocationRef.current.x >= refInput.current.getBoundingClientRect().left
      && mouseLocationRef.current.x <= refInput.current.getBoundingClientRect().right
      && mouseLocationRef.current.y >= refInput.current.getBoundingClientRect().top
      && mouseLocationRef.current.y <= refInput.current.getBoundingClientRect().bottom) {
      refInput.current.focus({ preventScroll: true });
      return;
    }
    if (!document.hasFocus()) {
      return;
    }

    setIsFocused(false);
    dispatchReducer({
      type: SearchBarActionTypes.UPDATE_GAME_NAME,
      payload: { gameName: '' },
    });
    dispatchReducer({
      type: SearchBarActionTypes.OPEN_RESULTS,
      payload: { openResults: false },
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchReducer({
      type: SearchBarActionTypes.UPDATE_GAME_NAME,
      payload: { gameName: event.target.value },
    });

    if (submitRef.current) {
      clearTimeout(submitRef.current);
    }
    submitRef.current = setTimeout(() => {
      onSubmit();
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (submitRef.current) {
      clearTimeout(submitRef.current);
    }
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    setIsFocused(false);
  }, [location.pathname, dispatchReducer]);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      mouseLocationRef.current = { x: e.clientX, y: e.clientY };
    });
    return () => {
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <StyledSearchBar
      $fixedWidth={fixedWidth}
      aria-describedby="simple-popper"
      value={value}
      inputRef={refInput}
      className="text-field"
      InputProps={showPrefix ? {
        startAdornment: (
          <InputAdornment
            position="start"
            className="search-text-field-icon"
          >
            <SearchIcon />
          </InputAdornment>
        ),
      } : undefined}
      onKeyDown={handleKeyDown}
      $isFocused={isFocused || openResults}
      onChange={handleChange}
      onFocus={handleClick}
      onBlur={handleClose}
    />
  );
}

SearchBarInput.defaultProps = {
  showPrefix: true,
  fixedWidth: true,
};
