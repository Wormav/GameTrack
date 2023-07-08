import React, {
  ChangeEvent, useRef, useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import StyledSearchBar from './search-bar-input.styles';

interface SearchBarInputProps {

  openResults: boolean;
  onSubmit: (name: string) => void;
  showPrefix?: boolean;
  refInput: React.RefObject<HTMLInputElement>;
  fixedWidth?: boolean;
  keepOpen?: boolean;
}

export default function SearchBarInput({
  openResults,
  onSubmit,
  refInput,
  showPrefix = true,
  fixedWidth = true,
  keepOpen = false,
}: SearchBarInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const submitRef = useRef<NodeJS.Timeout | null>(null);
  const handleClick = () => {
    setIsFocused(true);
    refInput.current?.focus({ preventScroll: true });
  };

  const handleClose = () => {
    if (!openResults) {
      setIsFocused(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
  return (
    <StyledSearchBar
      $fixedWidth={fixedWidth}
      aria-describedby="simple-popper"
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
};
