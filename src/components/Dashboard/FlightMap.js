import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle, Polyline } from 'react-leaflet'
import FlightSelect from './FlightController';

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

    for (let i = 0; i < this.props.flightData.length; i++) {
      const flightPath = this.props.flightData[i];
      const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];
      const destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']]

      airports.push(
        <Circle
          key={i * 2}
          center={originCoordinate}
          radius={1000}
          color="red"
          fillColor="#f08080"
          fillOpacity={0.5}>
        </Circle>);

      airports.push(
        <Circle
          key={i * 2 + 1}
          center={destCoordinate}
          radius={1000}
          color="green"
          fillColor="#98fb98"
          fillOpacity={0.5}>
        </Circle>
      )
    }

    return airports;
  }

  createFlightPaths = () => {
    const paths = [];

    for (let i = 0; i < this.props.flightData.length; i++) {
      const flightPath = this.props.flightData[i];
      const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];
      const destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']]

      paths.push(
        <Polyline
          key={i}
          positions={[originCoordinate, destCoordinate]}
          color="white"
          weight={1}>
        </Polyline>);
    }

    return paths;
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
          {this.createFlightPaths()}
        </Map>
      </div>
    );
  }
}

export default FlightMap;


