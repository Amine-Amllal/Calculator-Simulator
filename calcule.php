<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculatrice</title>
    
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- External CSS -->
    <link rel="stylesheet" href="style_c.css">
    <style>
        body {
            overflow: hidden;
        }
        :root {
            --primeColor: rgb(22, 255, 197);
            --secondColor: rgb(103, 255, 242);
            --backgroundColor: black;
            --lightColor: rgba(255, 255, 255, 0.842);
            --backgroundColor2: rgb(43, 43, 43);
        }
        header {
            background-color: var(--backgroundColor2);
            width: 100%;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
        }

        .header-left {
            display: flex;
            gap: 30px;
            padding-left: 0px;
        }

        .header-left a {
            color: var(--lightColor);
            text-decoration: none;
            font-size: 1.4em;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .header-left a i {
            font-size: 1.8em;
            color: var(--primeColor);
        }

        .header-right {
            display: flex;
            align-items: center;
            color: var(--lightColor);
        }

        @media (max-width: 1200px) {
            .header-left a {
                font-size: 1.2em;
            }

            .calculator {
                width: 80vw;
                max-width: 450px;
            }

            .display {
                font-size: 3em;
            }

            .buttons button {
                font-size: 1.2em;
            }
        }

        @media (max-width: 768px) {
            .header-left {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }

            .calculator {
                width: 90vw;
                max-width: 400px;
            }

            .display {
                font-size: 2.5em;
            }

            .buttons button {
                font-size: 1.1em;
            }
        }

        .header-right {
            display: flex;
            align-items: center;
            color: var(--lightColor);
            padding-right: 20px;
        }


        .account-toggle {
            background: none;
            border: none;
            color: var(--lightColor);
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 1.2em;
            gap: 10px;
        }

        .account-toggle i {
            font-size: 1.5em;
            color: var(--primeColor);
        }
        .account-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            right: 80px;
            width: 300px;
            background-color: var(--backgroundColor2);
            border: 2px solid var(--primeColor);
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            z-index: 20;
                
        }

        .account-dropdown.active {
            display: block;
        }
        .account-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid var(--primeColor);
        }

        .account-header h3 {
            margin: 0;
            color: var(--primeColor);
            font-size: 1.5em;
        }

	        .close-btn {
            background: none;
            border: none;
            color: var(--lightColor);
            font-size: 2em;
            cursor: pointer;
        }
        .account-content {
            padding: 15px;
        }
        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }

        .user-info i {
            font-size: 3em;
            color: var(--primeColor);
        }

        .user-info p {
            margin: 0;
            color: var(--lightColor);
        }
        .account-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .account-btn {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 2px solid var(--primeColor);
            background-color: var(--backgroundColor);
            color: var(--primeColor);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .logout-btn:hover {
            background-color: var(--primeColor);
            color: var(--backgroundColor);
        }
        .delete-btn {
            border-color: red;
            color: red;
        }
        .delete-btn:hover {
            background-color: red;
            color: var(--backgroundColor);
        }

    </style>
</head>
<body>
<header>
        <div class="header-left">
            <a href="calcule.php"><i class="fas fa-microchip"></i> Calculatrice simple</a>
            <a href="Matrice.php"><i class="fas fa-cube"></i> Calculatrice matricielle</a>
            <a href="Graphes.php"><i class="fas fa-wave-square"></i> Calculatrice graphique</a>
        </div>
        <div class="header-right">
            <button id="accountToggle" class="account-toggle">
                <i class="fas fa-user"></i><span>Compte</span>
            </button>
            <div id="accountDropdown" class="account-dropdown">
                <div class="account-header">
                    <h3>Compte</h3>
                    <button id="closeAccount" class="close-btn">&#xd7;</button>
                </div>
                <div class="account-content">
                    <div class="user-info">
                        <i class="fas fa-user-circle"></i>
                        <span>Utilisateur: <br><strong>
                <?php 
                    echo isset($_SESSION['user']) ? $_SESSION['user']['prenom'] . ' ' . $_SESSION['user']['nom'] : 'John Doe';
                ?>
            </strong></span>
                    </div>
                        <div class="account-actions">
                        <button id="logoutBtn" class="account-btn logout-btn">
                            <i class="fas fa-sign-out-alt"></i> D&#xe9;connexion
                        </button>
                        <button id="deleteAccountBtn" class="account-btn delete-btn">
                            <i class="fas fa-trash-alt"></i> Supprimer le compte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="container">
        <div class="calculator">
            <div class="display-container">
                <div class="formula" id="formula"></div>
                <input type="text" class="display" disabled value="0">
            </div>

            <div class="buttons">
                <button class="clear">CE</button>
                <button>x!</button>
                <button>(</button>
                <button>)</button>
                <button class="operator">%</button>
                <button class="clear">AC</button>
                <button>sin</button>
                <button>&#x3c0;</button>
                <button class="number">7</button>
                <button class="number">8</button>
                <button class="number">9</button>
                <button class="operator">+</button>
                <button>cos</button>
                <button>log</button>
                <button class="number">4</button>
                <button class="number">5</button>
                <button class="number">6</button>
                <button class="operator">-</button>
                <button>tan</button>
                <button>&#x221a;</button>
                <button class="number">1</button>
                <button class="number">2</button>
                <button class="number">3</button>
                <button class="operator">x</button>
                <button>e</button>
                <button>x^y</button>
                <button class="number">0</button>
                <button class="decimal">.</button>
                <button class="equals">=</button>
                <button class="operator">/</button>
            </div>
        </div>

        <div class="history-toggle-container">
            <button id="historyToggle" class="history-toggle-btn">
                <i class="fas fa-history"></i> Historique
                <span id="historyCount" class="history-count">0</span>
            </button>
            <div id="historyDropdown" class="history-dropdown">
                <button id="historyDeleteAll" class="history-delete-all">
                    <i class="fas fa-trash"></i> Supprimer tous
                </button>
            </div>
        </div>
    </div>

    <!-- External JavaScript -->
    <script src="script_c.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
  const accountToggle = document.getElementById('accountToggle');
  const accountDropdown = document.getElementById('accountDropdown');
  const closeAccount = document.getElementById('closeAccount');
  const logoutBtn = document.getElementById('logoutBtn');
  const deleteAccountBtn = document.getElementById('deleteAccountBtn');
  accountToggle.addEventListener('click', () => {
    accountDropdown.classList.toggle('active');
  });
  document.addEventListener('click', event => {
    if (!accountToggle.contains(event.target) && !accountDropdown.contains(event.target)) {
      accountDropdown.classList.remove('active');
    }
  });
  closeAccount.addEventListener('click', () => {
    accountDropdown.classList.remove('active');
  });
  logoutBtn.addEventListener('click', () => {
    const confirmLogout = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      alert('Vous avez été déconnecté');
    }
  });
  deleteAccountBtn.addEventListener('click', () => {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    if (confirmDelete) {
      alert('Votre compte a été supprimé');
    }
  });
});
document.getElementById('logoutBtn').addEventListener('click', function() {
    fetch('logout.php', {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            window.location.href = 'sign_up_page.php'; // Rediriger vers la page de connexion
        } else {
            console.error('Erreur lors de la déconnexion');
        }
    }).catch(error => {
        console.error('Erreur lors de la déconnexion:', error);
    });
});
document.getElementById('deleteAccountBtn').addEventListener('click', function() {
    if (confirm('Voulez-vous vraiment supprimer votre compte?')) {
        fetch('delete_account.php', {
            method: 'POST', // Assurez-vous que userId est défini
        }).then(response => {
            if (response.ok) {
                window.location.href = 'sign_up_page.php'; // Rediriger vers la page de connexion
            } else {
                console.error('Erreur lors de la suppression du compte');
            }
        }).catch(error => {
            console.error('Erreur lors de la suppression du compte:', error);
        });
    }
});
    </script>
</body>
</html>
