import React, { PureComponent } from 'react'

class Photo extends PureComponent {
  render() {
    const { alt, src } = this.props

    return (
      <div>
        <img alt={alt} src={src} />
      </div>
    )
  }
}

export default Photo
