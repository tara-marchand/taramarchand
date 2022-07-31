import * as React from 'react';

export interface Props {
  hiragana: string;
  katakana: string;
  romaji: string;
}

export default function FlashCard(props: Props) {
  const { hiragana, katakana, romaji } = props;

  return (
    <div>
      <div>{hiragana}</div>
      <div>{katakana}</div>
      <div>{romaji}</div>
    </div>
  );
}
