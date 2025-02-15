<?php
session_start();
$utilisateur_id = $_SESSION['user']['id'];
$entry_id = $_POST['id'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

$sql = "DELETE FROM historique_calcul WHERE id = ? AND utilisateur_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $entry_id, $utilisateur_id);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
