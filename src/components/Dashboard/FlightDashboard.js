import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlightController from './FlightController';
import FlightCost from './FlightCost';
import FlightMap from './FlightMap';
import FlightStats from './FlightStats';

import { FibonacciHeap } from '@tyriar/fibonacci-heap';


class FlightDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: 'HNL',
      dest: 'BGR',
      year: this.props.flightData[0]['year'],
      quarter: this.props.flightData[0]['quarter'],
    }
  }

  callbackSetState = (state) => {
    this.setState(state);
  }

  dijkstra = (V, E, W, source) => {
    const dist = {};
    const previous = {};
    const Q = new FibonacciHeap();

    for (let v of V) {
      dist[v] = Infinity;
      previous[v] = undefined;
      Q.insert(v, dist[v]);
    }
    dist[source] = 0;

    while (!Q.isEmpty()) {
      const u = Q.extractMinimum().key;
      if (E[u] === undefined) {
        continue;
      }
      for (let v of E[u]) {
        const alt = dist[u] + W[[u, v]];
        if (alt < dist[v]) {
          dist[v] = alt;
          Q.insert(v, dist[v]);
          previous[v] = u;
        }
      }
    }
    console.log(dist);
    return { 'path': previous, 'dist': dist };
  }

  render() {
    const flightData = [];
    for (let fd of this.props.flightData) {
      if (fd['year'] === this.state.year &&
        fd['quarter'] === this.state.quarter) {
        flightData.push(fd);
      }
    }

    const origin = new Set(flightData.map((fd) => fd['origin_abr']));
    const dest = new Set(flightData.map((fd) => fd['dest_abr']));
    const V = new Set([...origin, ...dest]);
    const E = {};
    const W = {};

    for (let fd of flightData) {
      if (E[fd['origin_abr']] === undefined) {
        E[fd['origin_abr']] = [fd['dest_abr']];
      }
      else {
        E[fd['origin_abr']].push(fd['dest_abr']);
      }
      W[[fd['origin_abr'], fd['dest_abr']]] = fd['market_fare'];
    }
    const dijkstraResult = this.dijkstra(V, E, W, this.state.origin);

    const flightPathData = [];
    for (let fd of this.props.flightData) {
      if (fd['origin_abr'] === this.state.origin &&
        fd['dest_abr'] === this.state.dest) {
        flightPathData.push(fd);
      }
    }

    // console.log(this.props.flightPathStats);

    const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#865FC2', '#F52EF4', '#F58680'];
    const thickness = [1, 2, 3, 4, 5, 6, 7];

    return (
      <div>
        <Container style={{ marginTop: "1em" }}>
          <Row style={{ marginTop: "1em" }}>
            <Col xs="4">
              <FlightController
                originStateLabel={'Hawaii'}
                destStateLabel={'Maine'}
                originState={'HI'}
                destState={'ME'}
                originAirport={'HNL'}
                destAirport={'BGR'}
                year={this.state.year}
                quarter={this.state.quarter}
                callback={this.callbackSetState}
                airportsData={Object.keys(this.props.airportsData).sort().map((val) => {
                  return { label: val, value: val }
                })}
                statesData={this.props.statesData}
                statesToAirportsData={this.props.statesToAirportsData}
                yearsData={this.props.yearsData}>
              </FlightController>
              <FlightCost
                origin={this.state.origin}
                dest={this.state.dest}
                shortestPath={dijkstraResult['path']}
                shortestDist={dijkstraResult['dist']}
                colors={colors}>
              </FlightCost>
            </Col>
            <Col xs="8">
              <FlightMap
                origin={this.state.origin}
                dest={this.state.dest}
                flightData={flightData}
                airportsData={this.props.airportsData}
                shortestPath={dijkstraResult['path']}
                colors={colors}
                thickness={thickness}
                year={this.state.year}
                quarter={this.state.quarter}
                flightPathStats={this.props.flightPathStats}>
              </FlightMap>
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <FlightStats
                origin={this.state.origin}
                dest={this.state.dest}
                year={this.state.year}
                quarter={this.state.quarter}
                flightData={flightPathData}
                flightPathStats={this.props.flightPathStats}
                yearsData={this.props.yearsData}
                shortestPath={dijkstraResult['path']}
                shortestDist={dijkstraResult['dist']}
                colors={colors}>
              </FlightStats>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FlightDashboard;


