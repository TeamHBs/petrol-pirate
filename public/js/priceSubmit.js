const res = require('express/lib/response');

const priceSubmit = async (event) => {
    event.preventDefault();

    const price = document.querySelector('#priceInput').value.trim();
    const name = document.querySelector('#stationInput').value.trim();
    // const address =
    // const zip =

    const newStation = await fetch('/api/stations', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (newStation.ok) {
        //   get station id from db

        console.log(`newStation=${newStation.body}`);
        // const station_id = parsedStation.id;
        const station_id = parsedStation.body.id;
        // console.log(`parsedStation=${parsedStation}`);
        console.log(`newStationID=${station_id}`);

        // use id to do post to price model

        // const newPrice = await fetch('/api/prices/', {
        //     method: 'POST',
        //     body: JSON.stringify({ price, station_id }),
        //     headers: { 'Content-Type': 'application/json' },
        // });
        // console.log(newPrice);
        // document.location.replace('/profile');
    } else {
        alert('Failed to create price');
    }

    // fetch('/api/users/login', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // }).then((res) =>
    //     res.json().then((data) => {
    //         console.log(data);
    //         const userId = data.id;
    //         const newPrice = fetch('/api/prices/', {
    //             method: 'POST',
    //             body: JSON.stringify({ price, station, userId }),
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         console.log(newPrice);

    // if (response.ok) {
    //     document.location.reload();
    // } else {
    //     alert(response.statusText);
    // }
    //     })
    // );
};

document.querySelector('#priceSubmit').addEventListener('click', priceSubmit);
