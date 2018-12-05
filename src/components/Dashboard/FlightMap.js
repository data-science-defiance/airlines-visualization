import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Circle, Polyline, LayerGroup, Marker } from 'react-leaflet';
import { Card } from 'reactstrap';

class FlightMap extends React.Component {

  createAirportMarkers = () => {
    const airports = [];

    const maxDepartures = Math.max(...this.props.flightData.map((fd) => {
      return fd['departures'];
    }));
    
    const iconTakeoff = new L.Icon({
        iconUrl: require('../../assets/takeoff.svg'),
        iconRetinaUrl: require('../../assets/takeoff.svg'),
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(20, 20),
        className: 'leaflet-div-icon'
      
    });

    for (let i = 0; i < this.props.flightData.length; i++) {
      const flightPath = this.props.flightData[i];
      const originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']];
      const destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']]

      const radius = 10000 * (flightPath['departures'] / maxDepartures + 1);

      airports.push(
        <Marker
          key={i * 2}
          position={destCoordinate}
          icon={ iconTakeoff }
        >
        </Marker>);

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
      const weight = 10 * (flightPath['pass_sum'] / maxPassengers + 0.25);

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
    
    const iconTakeoff = new L.Icon({
        iconUrl: require('../../assets/takeoff.svg'),
        iconRetinaUrl: require('../../assets/takeoff.svg'),
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(20, 20),
        className: 'leaflet-div-icon'
      
    });
    
    const iconLanding = new L.Icon({
        iconUrl: require('../../assets/arriving.svg'),
        iconRetinaUrl: require('../../assets/arriving.svg'),
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(20, 20),
        className: 'leaflet-div-icon'
      
    });
    
    console.log(iconTakeoff);

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
      <Marker
        key={currAirport}
        position={currAirportCoordinate}
        icon={ iconLanding }
        >
      </Marker>);

    const colors = [];

    for (let i = 0; this.props.shortestPath[currAirport] !== undefined; i++) {
      colors.push(this.props.colors[i]);
      currAirport = this.props.shortestPath[currAirport];
    }

    currAirport = this.props.dest;

    for (let i = 0; this.props.shortestPath[currAirport] !== undefined; i++) {

      prevAirport = currAirport;
      prevAirportCoordinate = currAirportCoordinate;
      const flightPath = this.props.flightPathStats;

      currAirport = this.props.shortestPath[currAirport];
      currAirportCoordinate = [
        this.props.airportsData[currAirport]['lat'],
        this.props.airportsData[currAirport]['long'],
      ];
      let weight;
      let string = prevAirport + ':' + currAirport + ':' + this.props.year + ':' + this.props.quarter;
      console.log(flightPath[string].pass_sum);
      if(flightPath[string].pass_sum < 250) { weight = 70; }
      if(flightPath[string].pass_sum > 250) { weight = 60; }
      if(flightPath[string].pass_sum > 1000) { weight = 50; }
      if(flightPath[string].pass_sum > 4000) { weight = 40; }
      if(flightPath[string].pass_sum > 16000) { weight = 30; }
      if(flightPath[string].pass_sum > 64000) { weight = 20; }
      else { weight = 10; }
      //const weight = 2 * (flightPath['pass_sum'] / maxPassengers + 0.25);

      if(i != airports.length - 1) {     
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
          weight={weight}>
        </Polyline>);
      }
    }
    
    airports.pop();
    airports.push(
      <Marker
        key={currAirport}
        position={currAirportCoordinate}
        icon={ iconTakeoff }
        >
      </Marker>);

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

