<?php
session_start();
$utilisateur_id = $_SESSION['user']['id'];  // Récupération de l'ID de l'utilisateur

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Requête pour supprimer l'historique correspondant à l'utilisateur
$sql = "DELETE FROM historique_graph WHERE utilisateur_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $utilisateur_id);

if ($stmt->execute()) {
    echo "Historique supprimé avec succès.";
} else {
    echo "Erreur lors de la suppression de l'historique : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
