import { getKanaByRomaji, gujuon } from 'japanese-kana';
import React, { PureComponent } from 'react';
import FlashCard from './FlashCard';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Japanese {
  export interface State {
    hiragana: string;
    katakana: string;
    romaji: string;
    showCard: boolean;
  }
}

class Japanese extends PureComponent<Record<string, unknown>, Japanese.State> {
  state = {
    hiragana: '',
    katakana: '',
    romaji: '',
    showCard: false,
  };

  render() {
    const { hiragana, katakana, romaji, showCard } = this.state;

    return (
      <div>
        <button onClick={this.showRandomCard}>Random card!</button>
        {showCard && (
          <FlashCard hiragana={hiragana} katakana={katakana} romaji={romaji} />
        )}
      </div>
    );
  }

  showRandomCard = () => {
    const romaji = this.randomRomaji;
    const kana = getKanaByRomaji(romaji);
    const hiragana = kana[0];
    const katakana = kana[1];

    this.setState({ hiragana, katakana, romaji, showCard: true });
  };

  get randomRomaji() {
    const keys = Object.keys(gujuon);

    return keys[Math.floor(Math.random() * keys.length)];
  }
}

export default Japanese;
