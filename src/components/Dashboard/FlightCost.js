import React from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import './flight-cost.css';

class FlightCost extends React.Component {

  render() {
    let currAirport = this.props.dest;

    const shortestPath = [];
    const pathCost = [];
    let totalCost = 0;

    while (this.props.shortestPath[currAirport] !== undefined) {
      shortestPath.unshift(currAirport);
      pathCost.unshift(this.props.shortestDist[currAirport].toFixed(2));
      totalCost += this.props.shortestDist[currAirport];
      currAirport = this.props.shortestPath[currAirport];
    }
    shortestPath.unshift(this.props.origin)

    totalCost = totalCost.toFixed(2);

    const flightList = []
    for (let i = 0; i < shortestPath.length - 1; i++) {
      flightList.push(
        <li key={i}>{shortestPath[i] + " to " + shortestPath[i + 1] + " | " + pathCost[i]}</li>
      );
    }
    // const cardType = this.props.flightData.length ? "success" : "danger";
    // const headerColor = this.props.flightData.length ? "green" : "red";
    // const minCost = this.props.flightData.length ?
    //   "$" + Math.min(...this.props.flightData.map((fd) => {
    //     return fd['market_fare'];
    //   })).toFixed(2) : "No available flight";

    return (
      <div>
        <Card outline color="success" style={{ marginTop: "2em" }}>
          <CardHeader tag="h5">Minimum Flight Cost:</CardHeader>
          <CardBody>
            <Card>
              <Row>
                <Col xs="6">
                  <h4 className={"info-text"}> Total Cost: </h4>

                </Col>
                <Col xs="6">
                  <h4 className={"cost-text"}> ${totalCost} </h4>
                </Col>
              </Row>
            </Card>
          </CardBody>
          <CardBody>
            <Card>
              <CardBody>
                <ul>{flightList}</ul>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightCost;
