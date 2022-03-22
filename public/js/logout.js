// const hamburger = document.querySelector('.hamburger');
// const menu = document.querySelector('.menu');

const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('active');
//     menu.classList.toggle('active');
// });

// document.querySelectorAll('.nav-link').forEach((n) =>
//     n.addEventListener('click', () => {
//         hamburger.classList.remove('active');
//         menu.classList.remove('active');
//     })
// );

document.querySelector('#logout').addEventListener('click', logout);
