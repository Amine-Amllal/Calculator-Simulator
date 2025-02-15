<html><head><base href="." /><title>Page d'Inscription</title>
    <script>function togglePassword() {
        const passwordInput = document.getElementById("password");
        const eyeIcon = document.getElementById("eye-icon");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.add("visible");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.remove("visible");
        }
    }
    </script>
    <style>
    /* Styles existants */
    .container {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }
    
    .signup-container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    input, select {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .password-wrapper {
        position: relative;
        width: 100%;
    }
    
    .toggle-password {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        cursor: pointer;
    }
    
    /* Nouveau style pour la barre de force du mot de passe */
    .password-strength {
        width: 0%;
        height: 3px;
        background-color: rgb(22, 255, 197);
        transition: width 0.3s ease;
        margin-top: 5px;
    }
    
    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #45a049;
    }
    
    .login-link {
        display: block;
        text-align: center;
        margin-top: 15px;
        color: #666;
        text-decoration: none;
    }
    
    .signature {
        text-align: center;
        margin-top: 20px;
        color: #666;
    }
        .toast {
            visibility: hidden;
            min-width: 300px;
            background-color: #ff0202;
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
    <link rel="stylesheet" href="sign_up.css">
    </head>
    <body>
        <div class="container">
            <div class="title">Simulateur de calculatrice</div>
            <div class="signup-container">
                <h1>Inscription</h1>
                <form action="sign_up.php" method="POST">
                    <input type="text" name="Prenom" placeholder="Prenom" required>
                    <input type="text" name="Nom" placeholder="Nom" required>
                    <input type="email" name="Email" placeholder="Email" required>
                    
                    <div class="password-wrapper">
                        <input type="password" name="Password" id="password" placeholder="Mot de passe" required>
                        <svg id="eye-icon" class="toggle-password" onclick="togglePassword()" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        <div class="password-strength" id="password-strength"></div>
                    </div>
                
                    <select name="Statut" required>
                        <option value="">Selectionnez votre statut</option>
                        <option value="student">Etudiant</option>
                        <option value="professor">Professeur</option>
                    </select>
                    <button type="submit">S'inscrire</button>
                </form>            
                <a href="log_in.php" class="login-link">Vous avez un compte? Connexion</a>
            </div>
            <div class="signature">Made by Amine Amllal and Amine Essehraoui</div>
        </div>
    
    <script>
    // Fonction pour évaluer la force du mot de passe
    document.getElementById('password').addEventListener('input', function(e) {
        const password = e.target.value;
        const strengthBar = document.getElementById('password-strength');
        
        // Critères de force
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;
    
        // Calcul du score
        let score = 0;
        if (hasLowerCase) score += 20;
        if (hasUpperCase) score += 20;
        if (hasNumber) score += 20;
        if (hasSpecialChar) score += 20;
        if (isLongEnough) score += 20;
    
        // Mise à jour de la barre de progression
        strengthBar.style.width = `${score}%`;
        
        // Changement de couleur en fonction de la force
        if (score <= 20) {
            strengthBar.style.backgroundColor = '#ff4d4d'; // Rouge pour très faible
        } else if (score <= 40) {
            strengthBar.style.backgroundColor = '#ffa64d'; // Orange pour faible
        } else if (score <= 60) {
            strengthBar.style.backgroundColor = '#ffff4d'; // Jaune pour moyen
        } else if (score <= 80) {
            strengthBar.style.backgroundColor = '#4dff4d'; // Vert clair pour fort
        } else {
            strengthBar.style.backgroundColor = 'rgb(22, 255, 197)'; // Vert spécifié pour très fort
        }
    });
    </script>
    <!-- Toast Notification -->
<div id="toast" class="toast">Email deja existant</div>

<script>
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const toast = urlParams.get('toast');

    // Afficher la notification si 'toast=1'
    if (toast == 'email_exists') {
        var toastElement = document.getElementById("toast");
        toastElement.classList.add("show");
        setTimeout(function() {
            toastElement.classList.remove("show");
        }, 4000);
    }
</script>
    <script src="sign_up.js"></script>
    </body></html>