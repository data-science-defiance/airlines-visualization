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
      origin: 'HI',
      dest: 'CA',
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
        console.log(u);
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
    return previous;
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

    console.log(V);

    for (let fd of flightData) {
      if (E[fd['origin_abr']] === undefined) {
        E[fd['origin_abr']] = [fd['dest_abr']];
      }
      else {
        E[fd['origin_abr']].push(fd['dest_abr']);
      }
      W[[fd['origin_abr'], fd['dest_abr']]] = fd['market_fare'];
    }
    const shortestPath = this.dijkstra(V, E, W, 'HNL');
    console.log(shortestPath);

    return (
      <div>
        <Container style={{ "marginTop": "1em" }}>
          <Row>
            <Col xs="3">
              <FlightController
                origin={'Hawaii'}
                dest={'California'}
                year={this.state.year}
                quarter={this.state.quarter}
                callback={this.callbackSetState}
                statesData={this.props.statesData}
                yearsData={this.props.yearsData}>
              </FlightController>
              <FlightCost
                flightData={flightData}>
              </FlightCost>
            </Col>
            <Col xs="9">
              <FlightMap
                origin={this.state.origin}
                dest={this.state.dest}
                flightData={flightData}
                airportsData={this.props.airportsData}
                shortestPath={shortestPath}>
              </FlightMap>
            </Col>
          </Row>
          <Row style={{ "marginTop": "1em" }}>
            <Col>
              <FlightStats
                flightData={flightData}>
              </FlightStats>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FlightDashboard;


