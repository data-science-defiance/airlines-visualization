import React from 'react';
import Select from 'react-select';
import { Card, CardBody, CardTitle } from 'reactstrap';

class FlightController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.origin,
      dest: this.props.dest,
    };
  }

  setOrigin = (origin) => {
    this.setState({
      origin: origin.label,
    });
    this.props.originCallback(origin.value);
  }

  setDest = (dest) => {
    this.setState({
      dest: dest.label,
    });
    this.props.destCallback(dest.value);
  }

  render() {

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Plan your flight:</CardTitle>
            <h6>Origin:</h6>
            <Select
              value={this.state.origin}
              placeholder={this.state.origin}
              onChange={(evt) => this.setOrigin(evt)}
              options={this.props.statesData} />
            <br />
            <h6>Destination:</h6>
            <Select
              value={this.state.dest}
              placeholder={this.state.dest}
              onChange={(evt) => this.setDest(evt)}
              options={this.props.statesData} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightController;
