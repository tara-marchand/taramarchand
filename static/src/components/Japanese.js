import * as kana from 'japanese-kana';
import { PureComponent } from 'react';

class Japanese extends PureComponent {
  render() {
    return kana.line('ka');
  }
}

export default Japanese;
