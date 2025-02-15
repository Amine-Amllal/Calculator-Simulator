<?php
session_start();
$utilisateur_id = $_SESSION['user']['id'];  // ID de l'utilisateur connecté

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Requête pour supprimer l'historique de cet utilisateur
$sql = "DELETE FROM historique_calcul WHERE utilisateur_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $utilisateur_id);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Erreur lors de la suppression';
}

$stmt->close();
$conn->close();

// Retourne la réponse en JSON
echo json_encode($response);
?>