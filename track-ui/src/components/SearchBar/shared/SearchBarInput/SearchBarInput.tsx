import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { useLocation } from 'react-router-dom';
import StyledSearchBar from './search-bar-input.styles';

interface SearchBarInputProps {

  openResults: boolean;
  onSubmit: (name: string | null) => void;
  showPrefix?: boolean;
  refInput: React.RefObject<HTMLInputElement>;
  fixedWidth?: boolean;
  keepOpen?: boolean;
  clearOnLocationChange?: boolean;
  abortController?: AbortController;
}

export default function SearchBarInput({
  openResults,
  onSubmit,
  refInput,
  showPrefix = true,
  fixedWidth = true,
  keepOpen = false,
  clearOnLocationChange = true,
  abortController,
}: SearchBarInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const submitRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const handleClick = () => {
    setIsFocused(true);
    refInput.current?.focus({ preventScroll: true });
  };

  const handleClose = () => {
    if (abortController) {
      abortController.abort();
      setTimeout(() => {
        if (value !== '') {
          setValue('');
        }
      }, 700);
    }
    onSubmit(null);
    if (!openResults && document.hasFocus()) {
      setIsFocused(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (submitRef.current) {
      clearTimeout(submitRef.current);
    }
    submitRef.current = setTimeout(() => {
      onSubmit(event.target.value);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (submitRef.current) {
      clearTimeout(submitRef.current);
    }
    if (e.key === 'Enter') {
      const element = e.target as HTMLInputElement;
      onSubmit(element.value);
    }
  };

  useEffect(() => {
    if (clearOnLocationChange) { setValue(''); }
  }, [clearOnLocationChange, location.pathname]);

  useEffect(() => {
    if (!openResults) {
      setIsFocused(false);
      setValue('');
    }
  }, [openResults]);

  return (
    <StyledSearchBar
      $fixedWidth={fixedWidth}
      aria-describedby="simple-popper"
      value={value}
      className="text-field"
      ref={refInput}
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
      $isFocused={isFocused || keepOpen}
      onChange={handleChange}
      onFocus={handleClick}
      onBlur={handleClose}
    />
  );
}

SearchBarInput.defaultProps = {
  showPrefix: true,
  fixedWidth: true,
  keepOpen: false,
  clearOnLocationChange: true,
  abortController: undefined,
};
