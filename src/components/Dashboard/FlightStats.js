import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

class FlightStats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="6">
              <Card>
              <Plot
                data={[{
                  x: this.props.flightData.map((fd) => fd['origin_abr']),
                  y: this.props.flightData.map((fd) => fd['pass_sum']),
                  type: 'bar',
                }]}
                layout={{
                  autosize: true
                }}
                useResizeHandler={true}
                style={{width: "100%", height: "100%"}}
              />
              </Card>
             
            </Col>
          </Row>
          <Row>
            <Col xs="6">
            <Card>
            <Plot
                data={[{
                  x: this.props.flightData.map((fd) => fd['dest_abr']),
                  y: this.props.flightData.map((fd) => fd['pass_sum']),
                  type: 'bar',
                }]}
                layout={{
                  autosize: true
                }}
                useResizeHandler={true}
                style={{width: "100%", height: "100%"}}
              />
            </Card>
              
            </Col>
          </Row>
        </Container>   
      </div>
    );
  }
}

export default FlightStats;
