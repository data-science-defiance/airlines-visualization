import React from 'react';
import FlightSelect from './FlightSelect';

let options = ['Hawaii', 'California', 'Alaska', 'Maine'].sort();
const states = options.map((val) => {
  return { label: val, value: val }
});

class Controller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <FlightSelect states={states}></FlightSelect>
      </div>
    );
  }
}

export default Controller;
