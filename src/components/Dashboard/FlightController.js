import React from 'react';
import Select from 'react-select';
import { Card, CardBody, CardHeader, Container, Row, Col } from 'reactstrap';

import './flight-controller.css';

class FlightController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      originStateLabel: this.props.originStateLabel,
      destStateLabel: this.props.destStateLabel,
      originState: this.props.originState,
      destState: this.props.destState,
      originAirport: this.props.originAirport,
      destAirport: this.props.destAirport,
      year: this.props.year,
      quarter: this.props.quarter,
    };
  }

  render() {

    return (
      <div>
        <Card outline color="primary">
          <CardHeader tag="h4" className="bg-white">Plan your flight:</CardHeader>
          <CardBody className="bg-light">
            <Container>
              <Row className="form-row">
                <Col xs="7">  
                  <h6>Origin:</h6>
                  <Select
                    value={this.state.originStateLabel}
                    placeholder={this.state.originStateLabel}
                    onChange={(evt) => { 
                      this.setState({ 
                        originStateLabel: evt.label,
                        originState: evt.value,
                        originAirport: this.props.statesToAirportsData[evt.value][0],
                      });
                      this.props.callback({ origin: this.props.statesToAirportsData[evt.value][0] });
                    }}
                    options={this.props.statesData} />
                </Col>
                <Col xs="5">
                  <h6>Airport:</h6>
                  <Select
                    value={this.state.originAirport}
                    placeholder={this.state.originAirport}
                    onChange={(evt) => {
                      this.setState({ originAirport: evt.label });
                      this.props.callback({ origin: evt.value });
                    }}
                    options={this.props.statesToAirportsData[this.state.originState].map((val) => {
                      return {'label': val, 'value': val};
                    })} />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="7">
                  <h6>Destination:</h6>
                  <Select
                    value={this.state.destStateLabel}
                    placeholder={this.state.destStateLabel}
                    onChange={(evt) => { 
                      this.setState({ 
                        destStateLabel: evt.label,
                        destState: evt.value,
                        destAirport: this.props.statesToAirportsData[evt.value][0],
                      });
                      this.props.callback({ dest: this.props.statesToAirportsData[evt.value][0] });
                    }}
                    options={this.props.statesData} />
                </Col>
                <Col xs="5">
                  <h6>Airport:</h6>
                  <Select
                    value={this.state.destAirport}
                    placeholder={this.state.destAirport}
                    onChange={(evt) => {
                      this.setState({ destAirport: evt.label });
                      this.props.callback({ dest: evt.value });
                    }}
                    options={this.props.statesToAirportsData[this.state.destState].map((val) => {
                      return {'label': val, 'value': val};
                    })} />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="7">
                  <h6>Year:</h6>
                  <Select
                    value={this.state.year}
                    placeholder={this.state.year}
                    onChange={(evt) => {
                      this.setState({ year: evt.label });
                      this.props.callback({ year: evt.value });
                    }}
                    options={this.props.yearsData} />
                </Col>
                <Col xs="5">
                  <h6>Quarter:</h6>
                  <Select
                    value={this.state.quarter}
                    placeholder={this.state.quarter}
                    onChange={(evt) => {
                      this.setState({ quarter: evt.label });
                      this.props.callback({ quarter: evt.value });
                    }}
                    options={[1, 2, 3, 4].map((quarter) => {
                      return { "label": quarter, "value": quarter }
                    })} />
                </Col>
              </Row>
            </Container>
            {/* <h6>Origin:</h6>
            <Select
              value={this.state.origin}
              placeholder={this.state.origin}
              onChange={(evt) => {
                this.setState({ origin: evt.label });
                this.props.callback({ origin: evt.value });
              }}
              options={this.props.statesData} />
            <br />
            <h6>Destination:</h6>
            <Select
              value={this.state.dest}
              placeholder={this.state.dest}
              onChange={(evt) => {
                this.setState({ dest: evt.label });
                this.props.callback({ dest: evt.value });
              }}
              options={this.props.statesData} />
            <br /> */}

          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FlightController;
