const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
var snackbar = document.getElementById('snackbar');

const priceSubmit = async (event) => {
    event.preventDefault();

    const price = document.querySelector('#priceInput').value.trim();
    const name = document.querySelector('#stationInput').value.trim();
    const address = document.querySelector('#addressInput').value.trim();
    const zip = document.querySelector('#zipInput').value.trim();

    if (price === '' || name === '' || address === '' || zip === '') {
        snackbar.className = 'show';
        setTimeout(function () {
            snackbar.className = snackbar.className.replace('show', '');
            return;
        }, 3000);
    } else {
        const newStation = await fetch('/api/stations', {
            method: 'POST',
            body: JSON.stringify({ price, name, address, zip }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        //   get station id from db
        const station = await newStation.json();
        const station_id = station.id;

        // use id to do post to price model
        const newPrice = await fetch('/api/prices/', {
            method: 'POST',
            body: JSON.stringify({ price, station_id }),
            headers: { 'Content-Type': 'application/json' },
        }).catch((err) => console.log(err));

        if (newPrice.ok && newStation.ok) {
            document.location.replace('/?message=Your Price Has Been Submitted');
        } else {
            snackbar.className = 'show';
            setTimeout(function () {
                snackbar.className = snackbar.className.replace('show', '');
            }, 3000);
        }
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
