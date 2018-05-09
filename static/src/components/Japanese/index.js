import { gujuon, getKanaByRomaji } from 'japanese-kana';
import React, { PureComponent } from 'react';

import FlashCard from './FlashCard';

class Japanese extends PureComponent {
  state = {
    romaji: '',
    showCard: false
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

    // https://jsperf.com/random-object-property-selection
    return gujuon[keys[(keys.length * Math.random()) << 0]];
  }
}

export default Japanese;
