import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
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

  createAirportMarkers = () => {
    const airports = [];

    for (let i = 0; i < this.props.data.length; i++) {
      const flightPath = this.props.data[i];
      const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];

      airports.push(
        <Circle
          key={i}
          center={originCoordinate}
          radius={1000}
          fillColor='#f08080'
          fillOpacity={0.5}>
        </Circle>);
    }

    return airports;
  }

  render() {
    const position = [37.8, -96];
    const zoom = 4;

    return (
      <div>
        <Map center={position} zoom={zoom}>
          <TileLayer
            url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            id="mapbox.dark"
            accessToken="pk.eyJ1Ijoic2Vhbnl0YWsiLCJhIjoiY2ptOTFzYnJlMDd4dzNram9wejV6NWUzNCJ9.Pj7WJobAaBWN7naYDiw5XA"
          />
          {this.createAirportMarkers()}
        </Map>
      </div>
    );
  }
}

export default FlightMap;


