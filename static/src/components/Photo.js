import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Photo extends PureComponent {
  render() {
    const { alt, src } = this.props;

    return <img alt={alt} src={src} />;
  }
}

Photo.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired
};

export default Photo;
