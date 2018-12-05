import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Row, Col, Card } from 'reactstrap';

class FlightStats extends React.Component {

  render() {
    let currAirport = this.props.dest;

    const shortestPath = [];
    const pathCost = [];

    console.log(this.props.shortestDist);

    while (currAirport !== undefined) {
      shortestPath.unshift(currAirport);
      console.log(currAirport);
      if (this.props.shortestDist[currAirport] !== undefined) {
        pathCost.unshift(this.props.shortestDist[currAirport].toFixed(2));
      }

      currAirport = this.props.shortestPath[currAirport];
    }
    pathCost.shift()

    const flightPath = [];
    const departures = [];
    const passengers = [];

    const year_quarter_indices = [];
    const year_quarter_labels = [];
    for (let year = 2012; year <= 2017; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        year_quarter_indices.push(year + ":" + quarter);
        year_quarter_labels.push(year + " Q" + quarter);
      }
    }

    const timeSeriesData = [];

    for (let i = 0; i < shortestPath.length - 1; i++) {
      flightPath.push(shortestPath[i] + ' to ' + shortestPath[i + 1]);
      let index = shortestPath[i] + ':' + shortestPath[i + 1] + ':' + this.props.year + ':' + this.props.quarter;
      departures.push(this.props.flightPathStats[index]['departures']);
      passengers.push(this.props.flightPathStats[index]['pass_sum']);

      const summaryPath = [];
      for (let j = 0; j < year_quarter_indices.length; j++) {
        index = shortestPath[i] + ':' + shortestPath[i + 1] + ':' + year_quarter_indices[j];
        if (this.props.flightPathStats[index] !== undefined) {
          summaryPath.push(this.props.flightPathStats[index]['market_fare'].toFixed(2));
        }
        else {
          summaryPath.push(0);
        }
      }

      timeSeriesData.push({
        type: 'scatter',
        mode: 'lines',
        name: shortestPath[i] + ' to ' + shortestPath[i + 1],
        x: year_quarter_labels,
        y: summaryPath,
        line: {
          color: this.props.colors[i],
        },
        marker: {
          hoverinfo: "\$ y",
        }
      })
    }

    console.log(flightPath);
    console.log(pathCost);

    return (
      <div>
        <Container>
          <Row>
            {/* Bar graph: Passengers(y) vs Airports(x) (Origin) */}
            <Col xs="6" className="form-row">
              <Card>
                <Plot
                  data={[{
                    x: flightPath,
                    y: passengers,
                    type: 'bar',
                    marker:{size:16, color: this.props.colors},
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
            <Col xs="6" className="form-row">
              <Card>
                <Plot
                  data={[{
                    x: flightPath,
                    y: departures,
                    type: 'bar',
                    marker:{size:16, color: this.props.colors},
                  }]}
                  layout={{
                    autosize: true,
                    title: 'Number of Flights per Flight Leg',
                    xaxis: {
                      title: 'Flight Leg'
                    },
                    yaxis: {
                      title: 'Flights'
                    },

                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="6" className="form-row">
              <Card>
                <Plot
                  data={[{
                    labels: flightPath,
                    values: pathCost,
                    type: 'pie',
                    marker: {
                      colors: this.props.colors,
                    },
                  }]}
                  layout={{
                    // autosize: true,
                    title: 'Market Fare of Flight by Flight Leg',
                    // xaxis: {
                    //   title: 'Flight Leg'
                    // },
                    // yaxis: {
                    //   title: 'Flights'
                    // }
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </Card>
            </Col>
          </Row>
          <Row>

            <Col xs="12">
              <Card>
                <Plot
                  data={timeSeriesData}
                  layout={{
                    // autosize: true,
                    title: 'Market Fare of Flight Leg by Year and Quarter',
                    xaxis: {
                      title: 'Year and Quarter'
                    },
                    yaxis: {
                      title: 'Market Fare in U.S. Dollars'
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
