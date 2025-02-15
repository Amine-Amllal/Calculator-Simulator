<?php
session_start();
include('db.php');

// Récupération des données du formulaire
$email = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
$password = isset($_POST['Password']) ? $_POST['Password'] : '';

if (!empty($email) && !empty($password)) {
    // Vérifier si l'email existe
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows >= 1) {
        // L'utilisateur existe
        $user = $result->fetch_assoc();
        
        // Vérification du mot de passe
        if (password_verify($password, $user['password'])) {
            // Connexion réussie
            $_SESSION['user'] = [
                'prenom' => $user['prenom'],
                'nom' => $user['nom'],
                'id' => $user['id']
            ];
              // Stocker des infos de session si nécessaire
            header("Location: calcule.php?success=1");
            exit();
        } else {
            // Mot de passe incorrect
            header("Location: log_in_auth.php?error=incorrect_password");
            exit();
        }
    } else {
        // Utilisateur introuvable
        header("Location: log_in_auth.php?error=user_not_found");
        exit();
    }
    $stmt->close();
} else {
    // Champs vides
    header("Location: log_in_auth.php?error=empty_fields");
    exit();
}

$conn->close();
?>
