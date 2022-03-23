const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
var pinArray = [];
var map = null;

const fetchAddresses = async () => {
    const response = await fetch('/api/stations', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    data.forEach((station) => {
        fetch(`http://dev.virtualearth.net/REST/v1/Locations?postalCode=${station.zip}&addressLine=${station.address}&key=Am4krjad01w8_GGlHlLT0J9PqwIBaWRHbCP6LD8uiR59aTgaK8EwfTPeAMonAJpy`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (coord) {
                return coord.json();
            })
            .then(function (coordData) {
                // console.log(coordData);
                const coordinates = coordData.resourceSets[0].resources[0].point.coordinates;
                console.log(coordData.resourceSets[0].resources[0].point.coordinates);
                const loc = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);
                const target = new Microsoft.Maps.Pushpin(loc);
                //Add the pushpin to the map
                map.entities.push(target);
            });
    });
};

const querySubmit = async (event) => {
    event.preventDefault();
    pinArray = [];
    const filterChoice = document.querySelector('#filterChoice').value.trim();
    const filterInput = document.querySelector('#filterInput').value.trim();

    // const filter = await fetch(`/?${filterChoice}=${filterInput}`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // });

    // if (!filter.ok) {
    //     // If fail, alert
    //     alert(filter.statusText);
    // }

    // const response = await fetch('/api/prices', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // });

    document.location.replace(`/?${filterChoice}=${filterInput}`);
};

function loadMapScenario() {
    const lat = 41.8781;
    const lon = -87.6298;
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(lat, lon),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 10,
    });
    // console.log(pinArray);
    // // loop through location array to create all the
    // pinArray.forEach((pin) => {
    //     const loc = new Microsoft.Maps.Location(pin.lat, pin.lon);
    //     const target = new Microsoft.Maps.Pushpin(loc);
    //     //Add the pushpin to the map
    //     map.entities.push(target);
    // });
}

function resetPage() {
    window.location.href = 'http://localhost:3001/';
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((n) =>
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    })
);

document.querySelector('#filterSubmit').addEventListener('click', querySubmit);

document.querySelector('#resetButton').addEventListener('click', resetPage);

fetchAddresses();
