<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les données envoyées par la requête POST
$userId = $_SESSION['user']['id'];

// Supprimer les enregistrements associés dans la table historique_matrice
$sql = "DELETE FROM historique_matrice WHERE utilisateur_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    // Supprimer le compte de l'utilisateur de la base de données
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        // Détruire la session après suppression du compte
        session_unset();
        session_destroy();
        echo "Compte supprimé avec succès.";
    } else {
        echo "Erreur lors de la suppression du compte: " . $conn->error;
    }
} else {
    echo "Erreur lors de la suppression de l'historique: " . $conn->error;
}

$stmt->close();
$conn->close();
?>