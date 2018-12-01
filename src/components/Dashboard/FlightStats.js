import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Row, Col, Card } from 'reactstrap';

class FlightStats extends React.Component {

  render() {
    let currAirport = this.props.dest;

    const shortestPath = [];

    while (currAirport !== undefined) {
      shortestPath.unshift(currAirport);
      currAirport = this.props.shortestPath[currAirport];
    }

    const flightPath = [];
    const departures = [];
    const passengers = [];

    for (let i = 0; i < shortestPath.length - 1; i++) {
      flightPath.push(shortestPath[i] + ' to ' + shortestPath[i + 1]);
      const index = shortestPath[i] + ':' + shortestPath[i + 1] + ':' + this.props.year + ':' + this.props.quarter;
      departures.push(this.props.flightPathStats[index]['departures']);
      passengers.push(this.props.flightPathStats[index]['pass_sum'])
    }

    return (
      <div>
        <Container>
          <Row>
            {/* Bar graph: Passengers(y) vs Airports(x) (Origin) */}
            <Col xs="6">
              <Card>
                <Plot
                  data={[{
                    x: flightPath,
                    y: passengers,
                    type: 'bar',
                  }]}
                  layout={{
                    autosize: true,
                    title: 'Number of Passengers per Flight Leg',
                    xaxis: {
                      title: 'Flight Leg'
                    },
                    yaxis: {
                      title: 'Passengers'
                    }
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </Card>
            </Col>
            {/* Bar graph: Passengers(y) vs Airports(x) (Destination) */}
            <Col xs="6">
              <Card>
                <Plot
                  data={[{
                    x: flightPath,
                    y: passengers,
                    type: 'bar'
                  }]}
                  layout={{
                    autosize: true,
                    title: 'Number of Flights per Flight Leg',
                    xaxis: {
                      title: 'Flight Leg'
                    },
                    yaxis: {
                      title: 'Flights'
                    }
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
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
