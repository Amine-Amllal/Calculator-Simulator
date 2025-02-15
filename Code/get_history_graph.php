<?php
session_start();
$utilisateur_id = $_SESSION['user']['id'];  // Modification ici

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calcul";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Requête pour récupérer l'historique correspondant à l'utilisateur
$sql = "SELECT funct, DATE_FORMAT(date_heure, '%H:%i:%s') as heure FROM historique_graph WHERE utilisateur_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $utilisateur_id);
$stmt->execute();
$result = $stmt->get_result();

$historique = [];

while ($row = $result->fetch_assoc()) {
    $historique[] = $row;
}

$stmt->close();
$conn->close();

// Retourne les données en format JSON
echo json_encode($historique);
?>