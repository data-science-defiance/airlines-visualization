import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class FlightController extends React.Component {

  render() {
    const cardType = this.props.flightData.length ? "success" : "danger";
    const headerColor = this.props.flightData.length ? "green" : "red";
    const minCost = this.props.flightData.length ?
      "$" + Math.round(Math.min(...this.props.flightData.map((fd) => {
        return fd['market_fare'];
      })) * 100) / 100 : "No available flight";

    return (
      <div>
        <Card outline color={cardType} style={{ "marginTop": "2em" }}>
          <CardHeader tag="h5">Minimum Flight Cost:</CardHeader>
          <CardBody>
            <h4 style={{ "color": headerColor, "text-align": "right" }}> {minCost} </h4>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightController;
