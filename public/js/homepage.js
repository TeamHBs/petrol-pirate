const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
// const pinArray = document.querySelectorAll('.pushpin').value;
// const pinArray = [
//     { lat: 41.8781, lon: -87.6298 },
//     { lat: 42.0, lon: -86.0 },
// ];

// console.log(pinArray);

const querySubmit = async (event) => {
    event.preventDefault();

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

    document.location.replace(`/?${filterChoice}=${filterInput}`);
};

function loadMapScenario() {
    const lat = 41.8781;
    const lon = -87.6298;
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(lat, lon),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 10,
    });

    console.log(pinArray);

    // loop through location array to create all the
    pinArray.forEach((pin) => {
        const loc = new Microsoft.Maps.Location(pin.lat, pin.lon);
        const target = new Microsoft.Maps.Pushpin(loc);
        //Add the pushpin to the map
        map.entities.push(target);
    });
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
