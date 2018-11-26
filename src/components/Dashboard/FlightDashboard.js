import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlightController from './FlightController';
import FlightMap from './FlightMap';


let options = ['HNL', 'JHM', 'LAS', 'MSP'].sort();
const states = options.map((val) => {
  return { label: val, value: val }
});

class FlightDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: 'HNL',
      dest: 'LAS',
      flightData: this.props.flightData,
    }
  }

  selectOrigin = (origin) => {

    const flightData = []
    for (let fd of this.props.flightData) {
      if (fd['origin'] === origin.value && fd['dest'] === this.state.dest) {
        flightData.push(fd);
      }
    }
    this.setState({
      origin: origin.value,
      flightData: flightData,
    });
  }

  selectDest = (dest) => {
    const flightData = []
    for (let fd of this.props.flightData) {
      console.log(fd);
      console.log(dest);
      if (fd['origin'] === this.state.origin && fd['dest'] === dest.value) {
        flightData.push(fd);
      }
    }

    console.log(this.state.origin);
    console.log(flightData);

    this.setState({
      dest: dest.value,
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
                origin={this.state.origin}
                dest={this.state.dest}
                originCallback={this.selectOrigin}
                destCallback={this.selectDest}
                states={states}>
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
        </Container>
      </div>
    );
  }
}

export default FlightDashboard;


