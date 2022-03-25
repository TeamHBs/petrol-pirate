const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
var map = null;

const fetchAddresses = async () => {
    // const response = await fetch('/api/stations', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // });

    // const data = await response.json();
    const data = document.querySelectorAll('.stationRow');

    data.forEach((station) => {
        const tableCoord = { address: station.childNodes[5].innerHTML, zip: station.childNodes[7].innerHTML };
        console.log(tableCoord);

        fetch(`http://dev.virtualearth.net/REST/v1/Locations?postalCode=${tableCoord.zip}&addressLine=${tableCoord.address}&key=Am4krjad01w8_GGlHlLT0J9PqwIBaWRHbCP6LD8uiR59aTgaK8EwfTPeAMonAJpy`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (coord) {
                return coord.json();
            })
            .then(function (coordData) {
                const coordinates = coordData.resourceSets[0].resources[0].point.coordinates;
                const loc = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);
                const target = new Microsoft.Maps.Pushpin(loc, {
                    text: '☠️',
                    color: 'black',
                });
                //Add the pushpin to the map
                map.entities.push(target);
                target.setOptions({ enableHoverStyle: true });
            });
    });
};

const querySubmit = async (event) => {
    event.preventDefault();
    const filterChoice = document.querySelector('#filterChoice').value.trim();
    const filterInput = document.querySelector('#filterInput').value.trim();

    document.location.replace(`/?${filterChoice}=${filterInput}`);
};

function loadMapScenario() {
    const latChicago = 41.8781;
    const lonChicago = -87.6298;
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        // No need to set credentials if already passed in URL
        center: new Microsoft.Maps.Location(latChicago, lonChicago),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 11,
    });
}

function resetPage() {
    document.location.replace('/');
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
