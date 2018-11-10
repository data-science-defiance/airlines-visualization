var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1Ijoic2Vhbnl0YWsiLCJhIjoiY2ptOTFzYnJlMDd4dzNram9wejV6NWUzNCJ9.Pj7WJobAaBWN7naYDiw5XA'
}).addTo(map);


function flightPathLineScaling(numPassengers, maxPassengers=1) {
    return numPassengers / maxPassengers * 2 + 0.25
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
            'fillColor': '#f03',
            'fillOpacity': 0.5,
        }).addTo(map);

        L.circle(destCoordinate, {
            'color': 'green',
            'fillColor': '#98fb98',
            'fillOpacity': 0.5,
            'radius': flightPath['departures'] / maxFlights * 10000,
        }).addTo(map);

        L.polyline([originCoordinate, destCoordinate], {
            'color': 'white',
            'weight': flightPathLineScaling(flightPath['pass_sum'], maxPassengers=maxPassengers),
        }).addTo(map);
    }

});