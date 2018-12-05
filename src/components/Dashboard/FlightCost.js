import React from 'react';
import { Card, CardBody, CardHeader, Row, Col, Table } from 'reactstrap';
import './flight-cost.css';

class FlightCost extends React.Component {

  render() {
    let currAirport = this.props.dest;

    const shortestPath = [];

    while (currAirport !== undefined) {
      shortestPath.unshift(currAirport);
      currAirport = this.props.shortestPath[currAirport];
    }

    const pathCost = [];
    let totalCost = 0;

    for (let i = 0; i < shortestPath.length - 1; i++) {
      let index = shortestPath[i] + ':' + shortestPath[i + 1] + ':' + this.props.year + ':' + this.props.quarter;
      pathCost.push(this.props.flightPathStats[index]['market_fare'].toFixed(2));
      totalCost += this.props.flightPathStats[index]['market_fare'];
    }

    totalCost = totalCost.toFixed(2);

    const flightList = []
    for (let i = 0; i < shortestPath.length - 1; i++) {
      flightList.push(
        <tr style={{backgroundColor: this.props.colors[i] + "aa"}}>
          <td>{shortestPath[i]}</td>
          <td>{shortestPath[i + 1]}</td>
          <td>{pathCost[i]}</td>
        </tr>
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
          <CardHeader tag="h5" className="bg-white">Minimum Flight Cost:</CardHeader>
          <CardBody className="bg-light">
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
                <Table hover>
                  <thead>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Cost</th>
                  </thead>
                  <tbody>
                    {flightList}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightCost;
