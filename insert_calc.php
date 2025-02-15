<?php
session_start();
$utilisateur_id = $_SESSION['user']['id'];
$calculation = $_POST['calculation'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

$sql = "INSERT INTO historique_calcul (formule, utilisateur_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $calculation, $utilisateur_id);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['inserted_id'] = $stmt->insert_id;  // Récupère l'ID de l'insertion
} else {
    $response['status'] = 'error';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
