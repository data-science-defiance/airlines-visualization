import React from 'react';
import Select from 'react-select';
import { Card, CardBody, CardTitle } from 'reactstrap';

class FlightSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: 'Hawaii',
      dest: 'California',
    };
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
              onChange={(evt) => this.setState({ origin: evt })}
              options={this.props.states} />
            <br />
            <h6>Destination:</h6>
            <Select
              value={this.state.dest}
              placeholder={this.state.dest}
              onChange={(evt) => this.setState({ dest: evt })}
              options={this.props.states} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightSelect;
