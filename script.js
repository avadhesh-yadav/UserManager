const loginForm = document.getElementById('loginForm');
// const inputEmail = document.getElementById('Email');
// const inputPassword = document.getElementById('Password');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the values of the input fields
    let username = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('Password').value.trim();

    // Check if the  values match the credentials
    if (username === 'admin' && passwordValue === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        Swal.fire({
            title: 'Login!',
            text: 'successfully!!',
            icon: 'success',
            showConfirmButton:false,
            timer: 1500,
        }).then(() => {
            window.location.href = 'Main.html';
        });
    } else {
        swal.fire({
            title: '!Login failed',
            text: 'Invalid username or password',
            icon: 'error',
            confirmButtonText: 'try again'
        });

    }
});


