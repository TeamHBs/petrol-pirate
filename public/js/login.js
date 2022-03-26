// assign vars to html elements
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
var snackbar = document.getElementById('snackbar');

// handles the login for existing user
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the  page
            document.location.replace('/');
        } else {
            snackbar.className = 'show';
            setTimeout(function () {
                snackbar.className = snackbar.className.replace('show', '');
            }, 3000);
        }
    }
};

// handles sign up for new user
const signupFormHandler = async (event) => {
    event.preventDefault();

    // assign vars to form inputs
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if all inputs exist, post new user
    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if post succeeds, redirect to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            // if user post fails, notify user
            snackbar.className = 'show';
            setTimeout(function () {
                snackbar.className = snackbar.className.replace('show', '');
            }, 3000);
        }
    }
};

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

// listener for login form submission
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// listener for sign up form submission
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
