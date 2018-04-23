import React, { PureComponent } from 'react';
import 'whatwg-fetch';

class Photos extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    // get data
    fetch('/api/photos')
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        this.setState({ photos: json });
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  render() {
    return (
      <div>
        {this.state.photos.map(photo => <img alt="" key={photo} src={photo} />)}
      </div>
    );
  }
}

export default Photos;
