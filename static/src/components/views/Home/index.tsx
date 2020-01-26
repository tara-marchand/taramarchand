import React from 'react';

export default class Home extends React.Component<{}> {
  public render() {
    return (
      <div className="pr-4 pl-4">
        <img
          alt="Baker Beach and the Golden Gate Bridge"
          className="max-w-full object-cover"
          src="/static/images/baker-beach.jpg"
          srcSet="/static/images/baker-beach.jpg 1x,
              /static/images/baker-beach@2x.jpg 2x"
          style={{ maxHeight: '70vh' }}
        />
      </div>
    );
  }
}
