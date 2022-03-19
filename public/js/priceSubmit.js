const priceSubmit = async (event) => {
    event.preventDefault();

    const price = document.querySelector('#priceInput').value.trim();
    const name = document.querySelector('#stationInput').value.trim();
    const address = document.querySelector('#addressInput').value.trim();
    const zip = document.querySelector('#zipInput').value.trim();

    const newStation = await fetch('/api/stations', {
        method: 'POST',
        body: JSON.stringify({ name, address, zip }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json());

    //   get station id from db
    const station_id = newStation.id;
    // use id to do post to price model
    const newPrice = await fetch('/api/prices/', {
        method: 'POST',
        body: JSON.stringify({ price, station_id }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(newPrice);
    document.location.replace('/?message=Your Price Has Been Submitted');

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
