import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

type State = {
  lat: number;
  lng: number;
  zoom: number;
};

export default class SimpleExample extends React.Component<{}, State> {
  public state = {
    lat: 37.7749,
    lng: -122.4194,
    zoom: 13
  };

  public render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
