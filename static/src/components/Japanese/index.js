import { gujuon, getKanaByRomaji } from 'japanese-kana';
import React, { PureComponent } from 'react';

import FlashCard from './FlashCard'

class Japanese extends PureComponent {
  state = {
    showCard: false
  }

  render() {
    const { showCard } = this.state

    return (
      <button onClick={this.showRandomCard()}>Random card!</button>
      <FlashCard {...props} />
    )
  }

  showRandomCard() {

  }

  get randomCard() {
    const keys = Object.keys(gujuon);

    // https://jsperf.com/random-object-property-selection
    return gujuon[keys[(keys.length * Math.random()) << 0]];
  }
}

export default Japanese;
