const priceSubmit = async (event) => {
    event.preventDefault();

    const price = document.querySelector('#priceInput').value.trim();
    const name = document.querySelector('#stationInput').value.trim();

    console.log(name);

    const response = await fetch('/api/stations', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        //   get station id from db
        // use id to do post to price model
        // document.location.replace('/profile');
    } else {
        alert('Failed to create project');
    }

    // fetch('/api/users/login', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // }).then((res) =>
    //     res.json().then((data) => {
    //         console.log(data);
    //         const userId = data.id;
    //         const response = fetch('/api/prices/', {
    //             method: 'POST',
    //             body: JSON.stringify({ price, station, userId }),
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         console.log(response);

    // if (response.ok) {
    //     document.location.reload();
    // } else {
    //     alert(response.statusText);
    // }
    //     })
    // );
};

document.querySelector('#priceSubmit').addEventListener('click', priceSubmit);
