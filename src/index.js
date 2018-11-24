import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css'
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Controller from './components/Dashboard/Controller';
import FlightMap from './components/Dashboard/FlightMap';

import * as serviceWorker from './serviceWorker';

import Plotly from 'plotly';
import HNLFlights from './assets/HNLFlights';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Controller />, document.getElementById('flight-select'));
ReactDOM.render(<FlightMap data={HNLFlights} />, document.getElementById('flight-map'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
