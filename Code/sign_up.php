<?php
include('db.php');

if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prenom = isset($_POST['Prenom']) ? htmlspecialchars($_POST['Prenom']) : '';
    $nom = isset($_POST['Nom']) ? htmlspecialchars($_POST['Nom']) : '';
    $email = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
    $password = isset($_POST['Password']) ? password_hash($_POST['Password'], PASSWORD_DEFAULT) : '';
    $statut = isset($_POST['Statut']) ? htmlspecialchars($_POST['Statut']) : '';

    // Vérification si l'email existe déjà dans la base de données
    if (!empty($email)) {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Si l'email est déjà utilisé, rediriger avec un message d'erreur
            header("Location: sign_up_page.php?error=email_exists");
            exit();
        }
        $stmt->close();
    }

    // Vérification des autres champs
    if (!empty($prenom) && !empty($nom) && !empty($email) && !empty($password) && !empty($statut)) {
        $sql = "INSERT INTO users (prenom, nom, email, password, statut) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $prenom, $nom, $email, $password, $statut);

        if ($stmt->execute()) {
            header("Location: log_in_redirect.php?toast=1");
            exit();
        } else {
            echo "Erreur : " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Tous les champs sont obligatoires.";
    }
}

$conn->close();
?>
