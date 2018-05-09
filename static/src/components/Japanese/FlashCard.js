import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class FlashCard extends PureComponent {
  static propTypes = {
    hiragana: PropTypes.string.isRequired,
    katakana: PropTypes.string.isRequired,
    romaji: PropTypes.string.isRequired
  };

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

export default FlashCard;
