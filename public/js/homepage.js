const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

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
