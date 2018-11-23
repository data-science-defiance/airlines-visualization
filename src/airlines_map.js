
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1Ijoic2Vhbnl0YWsiLCJhIjoiY2ptOTFzYnJlMDd4dzNram9wejV6NWUzNCJ9.Pj7WJobAaBWN7naYDiw5XA'
}).addTo(map);


function airportRadiusScaling(numFlights, maxFlights=1) {
    return 10000 * (numFlights / maxFlights + 1);
}

function flightPathLineScaling(numPassengers, maxPassengers=1) {
    return 2 * (numPassengers / maxPassengers + 0.25)
}

Plotly.d3.json('data/HNLFlights.json', function (json) {
    console.log(json);

    numFlights = []
    numPassengers = []

    for (let flightPath of json) {
        numFlights.push(flightPath['departures']);
        numPassengers.push(flightPath['pass_sum']);
    }

    maxFlights = Math.max(...numFlights);
    maxPassengers = Math.max(...numPassengers);

    for (let i = 0; i < json.length; i++) {

        flightPath = json[i];

        originCoordinate = [flightPath['origin_lat'], flightPath['origin_long']]
        destCoordinate = [flightPath['dest_lat'], flightPath['dest_long']]

        L.circle(originCoordinate, {
            'color': 'red',
            'fillColor': '#f08080',
            'fillOpacity': 0.5,
            'radius': 1000,
        }).addTo(map).bindPopup(`Airport: ${flightPath['origin']}`);

        // L.marker(originCoordinate)
        //     .addTo(map)
        //     .bindPopup(`Airport: ${flightPath['origin']}`);
            
        let dest = L.circle(destCoordinate, {
            'color': 'green',
            'fillColor': '#98fb98',
            'fillOpacity': 0.5,
            'radius': airportRadiusScaling(flightPath['departures'], maxFlights=maxFlights),
            'dest': flightPath['dest'],
        }).addTo(map).bindPopup(`Airport: ${flightPath['dest']}`);

        // dest.destination = flightPath['dest'];

        dest.on('click', function (e) {
            console.log(e);
            console.log(e['dest']);
        }, this);

        L.polyline([originCoordinate, destCoordinate], {
            'color': 'white',
            'weight': flightPathLineScaling(flightPath['pass_sum'], maxPassengers=maxPassengers),
        }).addTo(map);
    }

});