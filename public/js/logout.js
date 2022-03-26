// handles logout
const logout = async () => {
    // fetch to logout route, checks if a session exists
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // send to login
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// listener on logout button to activate
document.querySelector('#logout').addEventListener('click', logout);
