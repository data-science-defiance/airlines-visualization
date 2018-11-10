
Plotly.d3.json('data/HNLFlights.json', function (hawaiiJson) {
    console.log(hawaiiJson);

    destinations = []
    flights = [];
    passengers = [];

    for (let i in hawaiiJson) {
        destinations.push(hawaiiJson[i]['dest']);
        flights.push(hawaiiJson[i]['departures']);
        passengers.push(hawaiiJson[i]['pass_sum']);
    }

    const flightsTrace = {
        x: destinations,
        y: flights,
        text: flights,
        textposition: 'auto',
        hoverinfo: 'none',
        name: 'Destinations from HNL',
        // marker: {
        //     color: maleColor,
        // },
        type: 'bar'
    };

    let barData = [flightsTrace];

    let barLayout = {
        title: 'Destinations vs. Number of Flights',
        barmode: 'group',
        xaxis: {
            title: 'Destinations',
        },
        yaxis: {
            title: 'Number of Flights',
        },
    };

    Plotly.newPlot('flights_bar', barData, barLayout);

    const passengersTrace = {
        x: destinations,
        y: passengers,
        text: passengers,
        textposition: 'auto',
        hoverinfo: 'none',
        name: 'Destinations from HNL',
        // marker: {
        //     color: maleColor,
        // },
        type: 'bar'
    };

    barData = [passengersTrace];

    barLayout = {
        title: 'Destinations vs. Number of Passengers',
        barmode: 'group',
        xaxis: {
            title: 'Destinations',
        },
        yaxis: {
            title: 'Number of Passengers',
        },
    };

    Plotly.newPlot('passengers_bar', barData, barLayout);
});