const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

const priceSubmit = (event) => {
    event.preventDefault();

    const price = document.querySelector('#priceInput').value.trim();
    const name = document.querySelector('#stationInput').value.trim();
    const address = document.querySelector('#addressInput').value.trim();
    const zip = document.querySelector('#zipInput').value.trim();

    const newStation = fetch('/api/stations', {
        method: 'POST',
        body: JSON.stringify({ price, name, address, zip }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => data.json())
        .catch((err) => console.log(err));

    //   get station id from db
    const station_id = newStation.id;
    // use id to do post to price model
    const newPrice = fetch('/api/prices/', {
        method: 'POST',
        body: JSON.stringify({ price, station_id }),
        headers: { 'Content-Type': 'application/json' },
    }).catch((err) => console.log(err));

    if (newPrice.ok && newStation.ok) {
        document.location.replace('/?message=Your Price Has Been Submitted');
    }
};

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

document.querySelector('#priceSubmit').addEventListener('click', priceSubmit);
