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

document.querySelector('#filterSubmit').addEventListener('click', querySubmit);
