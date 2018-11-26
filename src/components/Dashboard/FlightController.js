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
      origin: origin,
    });
    this.props.originCallback(origin);
  }

  setDest = (dest) => {
    this.setState({
      dest: dest,
    });
    this.props.destCallback(dest);
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
              options={this.props.states} />
            <br />
            <h6>Destination:</h6>
            <Select
              value={this.state.dest}
              placeholder={this.state.dest}
              onChange={(evt) => this.setDest(evt)}
              options={this.props.states} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightController;
