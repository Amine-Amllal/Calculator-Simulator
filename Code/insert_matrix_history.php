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

$operation = $_POST['operation'];
$matrices = $_POST['matrices'];
$result = $_POST['result'];

// Requête pour insérer l'historique dans la base de données
$sql = "INSERT INTO historique_matrice (utilisateur_id, operation, matrices, result) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $utilisateur_id, $operation, $matrices, $result);

if ($stmt->execute()) {
    echo "Historique ajouté avec succès.";
} else {
    echo "Erreur lors de l'ajout à l'historique : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
