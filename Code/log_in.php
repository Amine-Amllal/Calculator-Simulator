<html><head><base href="." /><!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page de Connexion</title>
        <link rel="stylesheet" href="log_in.css">
    </head>
    <body>
        <div class="title">Simulateur de calculatrice</div>
        <div class="login-container">
            <h1>Connexion</h1>
            <form action="auth.php" method="POST" >
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
    </body>
    </html>
