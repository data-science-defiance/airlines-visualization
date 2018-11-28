import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlightController from './FlightController';
import FlightMap from './FlightMap';
import FlightStats from './FlightStats';


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

  render() {
    const flightData = [];
    for (let fd of this.props.flightData) {
      if (fd['origin'] === this.state.origin && 
          fd['dest'] === this.state.dest && 
          fd['year'] === this.state.year && 
          fd['quarter'] === this.state.quarter) {
        flightData.push(fd);
      }
    }

    return (
      <div>
        <Container>
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
            </Col>
            <Col xs="9">
              <FlightMap
                origin={this.state.origin}
                dest={this.state.dest}
                flightData={flightData}>
              </FlightMap>
            </Col>
          </Row>
          <Row>
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


