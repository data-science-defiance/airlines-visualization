import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class FlightController extends React.Component {

  render() {
    let currAirport = this.props.dest;

    const shortestPath = [];
    const pathCost = [];
    let totalCost = 0;

    while (this.props.shortestPath[currAirport] !== undefined) {
      shortestPath.unshift(currAirport);
      totalCost += this.props.shortestDist[currAirport];
      currAirport = this.props.shortestPath[currAirport];
    }

    totalCost = totalCost.toFixed(2);
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
              <h4 style={{ color: "green", textAlign: "right", margin: "1px 10px 0 0" }}> ${totalCost} </h4>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightController;
