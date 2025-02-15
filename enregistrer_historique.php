<?php
session_start();
// On suppose que l'utilisateur est déjà connecté et que son ID est stocké dans la session
$utilisateur_id = $_SESSION['user']['id'];

// Récupération des données envoyées par POST
$operation = isset($_POST['operation']) ? $_POST['operation'] : null;
$matrices = isset($_POST['matrices']) ? $_POST['matrices'] : null;
$result = isset($_POST['result']) ? $_POST['result'] : null;

// Vérification de la présence des données
if ($operation && $matrices && $result) {
    // Connexion à la base de données
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "calcul";

    // Créer une connexion
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérifier la connexion
    if ($conn->connect_error) {
        die("Échec de la connexion : " . $conn->connect_error);
    }

    // Préparer la requête d'insertion
    $sql = "INSERT INTO historique_matrice (operation, matrices, result, utilisateur_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    // Lier les paramètres : 's' pour string, 'i' pour integer
    $stmt->bind_param("sssi", $operation, $matrices, $result, $utilisateur_id);

    // Initialiser la réponse
    $response = [];

    // Exécuter la requête et gérer la réponse
    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['inserted_id'] = $stmt->insert_id;  // Récupère l'ID de l'insertion
    } else {
        $response['status'] = 'error';
    }

    // Fermer la requête et la connexion
    $stmt->close();
    $conn->close();

    // Retourner la réponse au format JSON
    echo json_encode($response);
} else {
    // Si les données ne sont pas valides ou manquantes
    echo json_encode(['status' => 'error', 'message' => 'Certaines données sont manquantes.']);
}
?>
