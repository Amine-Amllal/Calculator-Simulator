<?php
session_start();
$utilisateur_id = $_SESSION['user']['id'];  // Récupération de l'ID de l'utilisateur
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Supprimer tout l'historique lié à l'utilisateur de la base de données
$sql = "DELETE FROM historique_matrice WHERE utilisateur_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $utilisateur_id);

if ($stmt->execute()) {
    echo "Tout l'historique a été supprimé avec succès.";
} else {
    echo "Erreur lors de la suppression de tout l'historique: " . $conn->error;
}

$stmt->close();
$conn->close();
?>