import React from 'react';

export default class Home extends React.Component<{}> {
  public render() {
    return (
      <img
        alt="Baker Beach and the Golden Gate Bridge"
        className="object-cover"
        src="/static/images/baker-beach.jpg"
        srcSet="/static/images/baker-beach.jpg 1366w 1x,
            /static/images/baker-beach@2x.jpg 2732w 2x"
      />
    );
  }
}
