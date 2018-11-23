import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import FlightSelect from './FlightSelect';

let options = ['Hawaii', 'California', 'Alaska', 'Maine'].sort();
const states = options.map((val) => {
  return { label: val, value: val }
});

class FlightMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const position = [37.8, -96];
    const zoom = 4;

    return (
      <div>
        <Map center={position} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default FlightMap;


