import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle, Polyline, CircleMarker, LayerGroup } from 'react-leaflet'
import FlightSelect from './FlightController';

class FlightMap extends React.Component {

  constructor(props) {
    super(props);
  }

  createAirportMarkers = () => {
    const airports = [];

    const maxDepartures = Math.max(...this.props.flightData.map((fd) => {
      return fd['departures'];
    }));

    for (let i = 0; i < this.props.flightData.length; i++) {
      const flightPath = this.props.flightData[i];
      const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];
      const destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']]

      const radius = 10000 * (flightPath['departures'] / maxDepartures + 1);

      airports.push(
        <Circle
          key={i * 2}
          center={originCoordinate}
          radius={radius}
          color="red"
          fillColor="#f08080"
          fillOpacity={0.5}>
        </Circle>);

      airports.push(
        <Circle
          key={i * 2 + 1}
          center={destCoordinate}
          radius={radius}
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

    const maxPassengers = Math.max(...this.props.flightData.map((fd) => {
      return fd['pass_sum'];
    }));

    for (let i = 0; i < this.props.flightData.length; i++) {
      const flightPath = this.props.flightData[i];
      const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];
      const destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']];
      const weight = 2 * (flightPath['pass_sum'] / maxPassengers + 0.25);

      paths.push(
        <Polyline
          key={i}
          positions={[originCoordinate, destCoordinate]}
          color="white"
          weight={weight}>
        </Polyline>);
    }

    return paths;
  }

  // createShortestAirportMarkers = () => {
  //   const airports = [];

  //   const maxDepartures = Math.max(...this.props.flightData.map((fd) => {
  //     return fd['departures'];
  //   }));

  //   for (let i = 0; i < this.props.flightData.length; i++) {
  //     const flightPath = this.props.flightData[i];
  //     const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];
  //     const destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']]

  //     const radius = 10000 * (flightPath['departures'] / maxDepartures + 1);

  //     airports.push(
  //       <Circle
  //         key={i * 2}
  //         center={originCoordinate}
  //         radius={radius}
  //         color="red"
  //         fillColor="#f08080"
  //         fillOpacity={0.5}>
  //       </Circle>);

  //     airports.push(
  //       <Circle
  //         key={i * 2 + 1}
  //         center={destCoordinate}
  //         radius={radius}
  //         color="green"
  //         fillColor="#98fb98"
  //         fillOpacity={0.5}>
  //       </Circle>
  //     )
  //   }

    createShortestFlightPaths = () => {
      const paths = [];

      // const maxPassengers = Math.max(...this.props.flightData.map((fd) => {
      //   return fd['pass_sum'];
      // }));

      let prevAirport;
      let prevAirportCoordinate;
      
      let currAirport = this.props.dest;
      let currAirportCoordinate = [
        this.props.airportsData[this.props.dest]['lat'], 
        this.props.airportsData[this.props.dest]['long'],
      ];
      
      while (this.props.shortestPath[currAirport] !== undefined) {

        prevAirport = currAirport;
        prevAirportCoordinate = currAirportCoordinate;
        
        currAirport = this.props.shortestPath[currAirport];
        currAirportCoordinate = [
          this.props.airportsData[currAirport]['lat'], 
          this.props.airportsData[currAirport]['long'],
        ];
        // const weight = 2 * (flightPath['pass_sum'] / maxPassengers + 0.25);

        paths.push(
          <Polyline
            key={[prevAirport, currAirport]}
            positions={[prevAirportCoordinate, currAirportCoordinate]}
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
              preferCanvas={true}
            />
            <LayerGroup>
              {this.createAirportMarkers()}
            </LayerGroup>
            <LayerGroup>
              {this.createShortestFlightPaths()}
            </LayerGroup>
          </Map>
        </div>
      );
    }
  }

  export default FlightMap;


