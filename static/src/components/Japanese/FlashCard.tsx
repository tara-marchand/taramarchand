import React, { PureComponent } from 'react';

export class FlashCard extends PureComponent<Props> {
  render() {
    const { hiragana, katakana, romaji } = this.props;

    return (
      <div>
        <div>{hiragana}</div>
        <div>{katakana}</div>
        <div>{romaji}</div>
      </div>
    );
  }
}

export interface Props {
  hiragana: string;
  katakana: string;
  romaji: string;
}

export default FlashCard;
