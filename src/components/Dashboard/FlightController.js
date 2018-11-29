import React from 'react';
import Select from 'react-select';
import { Card, CardBody, CardHeader, Container, Row, Col } from 'reactstrap';

import './flight-controller.css';

class FlightController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.origin,
      dest: this.props.dest,
      year: this.props.year,
      quarter: this.props.quarter,
    };
  }

  render() {

    return (
      <div>
        <Card outline color="primary">
          <CardHeader tag="h4">Plan your flight:</CardHeader>
          <CardBody>
            <Container>
              <Row className="form-row">
                <Col xs="12">
                  <h6>Origin (Airport):</h6>
                  <Select
                    value={this.state.origin}
                    placeholder={this.state.origin}
                    onChange={(evt) => {
                      this.setState({ origin: evt.label });
                      this.props.callback({ origin: evt.value });
                    }}
                    options={this.props.airportsData} />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="12">
                  <h6>Destination (Airport):</h6>
                  <Select
                    value={this.state.dest}
                    placeholder={this.state.dest}
                    onChange={(evt) => {
                      this.setState({ dest: evt.label });
                      this.props.callback({ dest: evt.value });
                    }}
                    options={this.props.airportsData} />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="12">
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
              </Row>
              <Row className="form-row">
                <Col xs="12">
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
