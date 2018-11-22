'use strict';

const e = React.createElement;

import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class FlightSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'origin': 'Honolulu',
            'dest': 'California',
        };

    }

    render() {
        return (
            <Select options={options} />
        )
    }
}

ReactDOM.render(
    <FlightSelect />,
    document.getElementById('flight-select')
);

class LikeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return (
            <button onClick={() => this.setState({ liked: true })}>
                Like
            </button>
        );
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);

class Clock extends React.Component {

    // Constructor part of the JavaScript ES6 Classes
    constructor(props) {
        super(props);
        this.state = {
            'date': new Date()
        };
    }

    // Special React Method: Calls when the component is mounted on the DOM
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    // Special React method: Calls when the component is removed from the DOM
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // Custom method: Internal functionality of a clock
    tick() {
        this.setState({
            'date': new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state['date'].toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('clock')
);