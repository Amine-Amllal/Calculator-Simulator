<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page de Connexion</title>
    <link rel="stylesheet" href="log_in.css">
    <style>
        .toast {
            visibility: hidden;
            min-width: 300px;
            background-color: #0fef0f;
            color: white;
            text-align: center;
            border-radius: 8px;
            padding: 16px;
            position: fixed;
            z-index: 1000;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            font-size: 17px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        .toast.success {
            background-color: #4caf50;
        }
        .toast.show {
            visibility: visible;
            animation: fadein 0.5s, fadeout 0.5s 3s;
        }
        @keyframes fadein {
            from { bottom: 0; opacity: 0; }
            to { bottom: 30px; opacity: 1; }
        }
        @keyframes fadeout {
            from { bottom: 30px; opacity: 1; }
            to { bottom: 0; opacity: 0; }
        }
    </style>
</head>
<body>

    <div class="title">Simulateur de calculatrice</div>
    <div class="login-container">
        <h1>Connexion</h1>
        <form action="auth.php" method="POST">
            <input type="email" placeholder="Email" name="Email" required>
            <div class="password-wrapper">
                <input type="password" id="password" placeholder="Mot de passe" name="Password" required>
                <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" class="toggle-password" onclick="togglePassword()" alt="Afficher">
            </div>
            <button type="submit">Se connecter</button>
        </form>
        <p class="note">Vous n'avez pas de compte ? <a href="sign_up.html" class="signup-link">S'inscrire</a></p>
    </div>
    <div class="signature">Made by Amine Amllal and Amine Essehraoui</div>
    <script src="log_in.js"></script>

<!-- Toast Notification -->
<div id="toast" class="toast">Inscription réussie! Veuillez vous connecter.</div>

<script>
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const toast = urlParams.get('toast');

    // Afficher la notification si 'toast=1'
    if (toast == '1') {
        var toastElement = document.getElementById("toast");
        toastElement.classList.add("show");
        setTimeout(function() {
            toastElement.classList.remove("show");
        }, 4000);
    }
</script>
<script src="log_in.js"></script>

</body>
</html>
