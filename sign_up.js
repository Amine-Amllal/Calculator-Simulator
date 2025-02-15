function togglePassword() {
    var passwordInput = document.getElementById('password');
    var icon = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.src = 'https://cdn-icons-png.flaticon.com/512/709/709605.png'; // Icon for visible
    } else {
        passwordInput.type = 'password';
        icon.src = 'https://cdn-icons-png.flaticon.com/512/709/709612.png'; // Icon for hidden
    }
}

function checkPasswordStrength() {
    var password = document.getElementById('password').value;
    var strengthBar = document.getElementById('password-strength');
    var strength = 0;

    if (password.length > 7) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@!%*?&#]+/)) strength += 1;

    switch (strength) {
        case 0:
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = 'red';
            break;
        case 1:
        case 2:
            strengthBar.style.width = '33%';
            strengthBar.style.backgroundColor = 'orange';
            break;
        case 3:
            strengthBar.style.width = '66%';
            strengthBar.style.backgroundColor = 'yellow';
            break;
        case 4:
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = 'green';
            break;
    }
}