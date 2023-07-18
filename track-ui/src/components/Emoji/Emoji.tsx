import React from 'react';

interface EmojiProps {
  emoji: string,
  label: string
}

export default function Emoji({ emoji, label }: EmojiProps) {
  return (
    <span role="img" aria-label={label}>{emoji}</span>
  );
}
