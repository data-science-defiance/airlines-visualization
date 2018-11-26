import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Row, Col } from 'reactstrap';

class FlightStats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="5">
            <Plot
              data={[{
                x: this.props.flightData.map((fd) => fd['origin_abr']),
                y: this.props.flightData.map((fd) => fd['pass_sum']),
                type: 'bar',
              }]}
              // layout={{
              //   width: 320,
              //   height: 240,
              // }}
            />
            </Col>
            <Col xs="5">
            <Plot
              data={[{
                x: this.props.flightData.map((fd) => fd['dest_abr']),
                y: this.props.flightData.map((fd) => fd['pass_sum']),
                type: 'bar',
              }]}
              // layout={{
              //   width: 320,
              //   height: 240,
              // }}
            />
            </Col>
          </Row>
        </Container>   
      </div>
    );
  }
}

export default FlightStats;
