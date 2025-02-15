function togglePassword() {
    var passwordInput = document.getElementById('password');
    var icon = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.src = 'https://cdn-icons-png.flaticon.com/512/709/709605.png'; // Icône visible
    } else {
        passwordInput.type = 'password';
        icon.src = 'https://cdn-icons-png.flaticon.com/512/709/709612.png'; // Icône cachée
    }
}
