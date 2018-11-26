import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlightController from './FlightController';
import FlightMap from './FlightMap';
import FlightStats from './FlightStats';


let options = ['HI', 'CA', 'MA', 'CO'].sort();
const states = options.map((val) => {
  return { label: val, value: val }
});

class FlightDashboard extends React.Component {

  constructor(props) {
    super(props);

    const flightData = []
    for (let fd of this.props.flightData) {
      if (fd['year'] === 2017 && fd['quarter'] === 1) {
        flightData.push(fd);
      }
    }

    this.state = {
      origin: 'HI',
      dest: 'CA',
      flightData: flightData,
    }
  }

  selectOrigin = (origin) => {

    const flightData = []
    for (let fd of this.props.flightData) {
      if (fd['origin_state'] === origin && fd['dest_state'] === this.state.dest) {
        flightData.push(fd);
      }
    }
    this.setState({
      origin: origin,
      flightData: flightData,
    });
  }

  selectDest = (dest) => {
    const flightData = []
    for (let fd of this.props.flightData) {
      if (fd['origin_state'] === this.state.origin && fd['dest_state'] === dest) {
        flightData.push(fd);
      }
    }

    this.setState({
      dest: dest,
      flightData: flightData,
    });
  }

  render() {

    return (
      <div>
        <Container>
          <Row>
            <Col xs="3">
              <FlightController
                origin={'Hawaii'}
                dest={'California'}
                originCallback={this.selectOrigin}
                destCallback={this.selectDest}
                statesData={this.props.statesData}>
              </FlightController>
            </Col>
            <Col xs="9">
              <FlightMap
                origin={this.state.origin}
                dest={this.state.dest}
                flightData={this.state.flightData}>
              </FlightMap>
            </Col>
          </Row>
          <Row>
            <Col>
              <FlightStats
                flightData={this.state.flightData}>
              </FlightStats>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FlightDashboard;


