var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoic2Vhbnl0YWsiLCJhIjoiY2ptOTFzYnJlMDd4dzNram9wejV6NWUzNCJ9.Pj7WJobAaBWN7naYDiw5XA'
}).addTo(map);

Plotly.d3.json('data/HNLFlights.json', function (json) {
    console.log(json);

    origin_lats = [];
    origin_longs = [];
    dest_lats = [];
    dest_longs = [];
    paths = [];

    for (let i = 0; i < json.length; i++) {
        origin_lats.push(json[i]['origin_lat']);
        origin_longs.push(json[i]['origin_long']);
        dest_lats.push(json[i]['dest_lat']);
        dest_longs.push(json[i]['dest_long']);
        paths.push([[origin_lats[i], origin_longs[i]], [dest_lats[i], dest_longs[i]]]);
    }

    for (let i = 0; i < json.length; i++) {

        L.circle([origin_lats[i], origin_longs[i]], {
            'color': 'red',
            'fillColor': '#f03',
            'fillOpacity': 0.5,
        }).addTo(map);

        L.circle([dest_lats[i], dest_longs[i]], {
            'color': 'green',
            'fillColor': '#98fb98',
            'fillOpacity': 0.5,
        }).addTo(map);

        L.polyline(paths[i], {
            'color': 'black',
            'weight': 0.1,
        }).addTo(map);
    }

});