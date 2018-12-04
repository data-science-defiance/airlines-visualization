import React from 'react';
import { Map, TileLayer, Circle, Polyline, LayerGroup } from 'react-leaflet';
import { Card } from 'reactstrap';

class FlightMap extends React.Component {

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


  createShortestFlightPaths = () => {

    const airports = [];
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

    airports.push(
      <Circle
        key={currAirport}
        center={currAirportCoordinate}
        radius={10000}
        color="red"
        fillColor="#f08080"
        fillOpacity={0.5}>
      </Circle>);

    const colors = [];

    for (let i = 0; this.props.shortestPath[currAirport] !== undefined; i++) {
      colors.push(this.props.colors[i]);
      currAirport = this.props.shortestPath[currAirport];
    }

    currAirport = this.props.dest;

    for (let i = 0; this.props.shortestPath[currAirport] !== undefined; i++) {

      prevAirport = currAirport;
      prevAirportCoordinate = currAirportCoordinate;

      currAirport = this.props.shortestPath[currAirport];
      currAirportCoordinate = [
        this.props.airportsData[currAirport]['lat'],
        this.props.airportsData[currAirport]['long'],
      ];
      // const weight = 2 * (flightPath['pass_sum'] / maxPassengers + 0.25);

      airports.push(
        <Circle
          key={currAirport}
          center={currAirportCoordinate}
          radius={10000}
          color="green"
          fillColor="#f08080"
          fillOpacity={0.5}>
        </Circle>);

      paths.push(
        <Polyline
          key={[prevAirport, currAirport]}
          positions={[prevAirportCoordinate, currAirportCoordinate]}
          color={colors[colors.length - i - 1]}
          weight={1}>
        </Polyline>);
    }

    return { 'airports': airports, 'paths': paths };
  }

  render() {
    const position = [32.8, -96];
    const zoom = 3;

    const shortestPaths = this.createShortestFlightPaths();

    return (
      <div>
        <Card>
          <Map center={position} zoom={zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              id="mapbox.light"
              accessToken="pk.eyJ1Ijoic2Vhbnl0YWsiLCJhIjoiY2ptOTFzYnJlMDd4dzNram9wejV6NWUzNCJ9.Pj7WJobAaBWN7naYDiw5XA"
              preferCanvas={true}
            />
            <LayerGroup>
              {shortestPaths['airports']}
            </LayerGroup>
            <LayerGroup>
              {shortestPaths['paths']}
            </LayerGroup>
          </Map>
        </Card>
      </div>
    );
  }
}

export default FlightMap;


