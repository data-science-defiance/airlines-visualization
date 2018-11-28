import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css'
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

// import App from './components/App';
// import Controller from './components/Dashboard/FlightController';
import FlightDashboard from './components/Dashboard/FlightDashboard';
import Header from './components/Header/Header';

import * as serviceWorker from './serviceWorker';

import Plotly from 'plotly';
import HNLFlights from './assets/HNLFlights';
import AllFlights from './assets/AllFlights';
import AllStates from './assets/AllStates';
import USAFlights from './assets/USAFlights';
import TestUSAFlights from './assets/TestUSAFlights';

import States from './assets/States';
import Years from './assets/Years';


// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Controller />, document.getElementById('flight-select'));
ReactDOM.render(
    <Header/>, 
    document.getElementById('header')
);
ReactDOM.render(
    <FlightDashboard flightData={USAFlights} statesData={States} yearsData={Years.sort().reverse()} />, 
    document.getElementById('flight-dashboard')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
