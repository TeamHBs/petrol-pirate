// variables storing menu for use in updating view setting
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
// initialize map
var map = null;

// creates the pins to place on the map
const fetchAddresses = async () => {
    // assigns variable to the data in the table on homepage
    const data = document.querySelectorAll('.stationRow');

    // for each table row
    data.forEach(async (station) => {
        // pulls address and zip from the above queryselectorall
        const tableCoord = { address: station.childNodes[5].innerHTML, zip: station.childNodes[7].innerHTML };

        // fetch location from microsoft maps
        const fetchLoc = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?postalCode=${tableCoord.zip}&addressLine=${tableCoord.address}&key=Am4krjad01w8_GGlHlLT0J9PqwIBaWRHbCP6LD8uiR59aTgaK8EwfTPeAMonAJpy`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        // make fetch return usable as JSON
        const coordData = await fetchLoc.json();
        // assign variable to lat and long in fetch return
        const coordinates = coordData.resourceSets[0].resources[0].point.coordinates;
        // assign new location in microsoft maps
        const loc = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);
        // create a new pushpin
        const target = new Microsoft.Maps.Pushpin(loc, {
            text: '☠️',
            color: 'black',
        });
        //Add the pushpin to the map
        map.entities.push(target);
        target.setOptions({ enableHoverStyle: true });
    });
};

// handles filter on homepage
const querySubmit = async (event) => {
    event.preventDefault();
    // assign var to filter rule
    const filterChoice = document.querySelector('#filterChoice').value.trim();
    // assign var to value to filter on
    const filterInput = document.querySelector('#filterInput').value.trim();

    // add queries to URL
    document.location.replace(`/?${filterChoice}=${filterInput}`);
};

// loads map on homepage
function loadMapScenario() {
    // set chicago as defaul map view
    const latChicago = 41.8781;
    const lonChicago = -87.6298;
    // create map
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        center: new Microsoft.Maps.Location(latChicago, lonChicago),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 11,
    });
}

// resets the home page to eliminate filters
function resetPage() {
    document.location.replace('/');
}

// listener for hamburger menu to show on screen
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// listener to remove hamburger menu
document.querySelectorAll('.nav-link').forEach((n) =>
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    })
);

// listen for filter submission
document.querySelector('#filterSubmit').addEventListener('click', querySubmit);
// listen for reset to eliminate filter
document.querySelector('#resetButton').addEventListener('click', resetPage);

fetchAddresses();
