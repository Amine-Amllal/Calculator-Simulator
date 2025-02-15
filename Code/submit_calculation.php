<?php

include('db.php');

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer la formule saisie par l'utilisateur
    $formula = isset($_POST['Formule']) ? $_POST['Formule'] : '';
    
    // Vérifier si la formule n'est pas vide
    if (!empty($formula)) {
        // Évaluer l'expression mathématique
        try {
            // Utilisation de eval() pour évaluer l'expression
            $result = eval('return ' . $formula . ';');
            
            // Préparer la requête pour insérer dans la base de données
            $sql = "INSERT INTO historique_calcul (formule, resultat) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $formula, $result);
            
            // Exécuter la requête
            if ($stmt->execute()) {
                // Enregistrement réussi, afficher un message
                echo "Calcul enregistré avec succès ! Résultat : " . $result;
            } else {
                // Si l'insertion échoue
                echo "Erreur d'enregistrement dans la base de données.";
            }

            // Fermer la requête préparée
            $stmt->close();
        } catch (Exception $e) {
            // Si l'expression est invalide
            echo "Erreur dans l'expression.";
        }
    } else {
        // Si aucune formule n'est saisie
        echo "Aucune formule saisie.";
    }
}

// Fermer la connexion à la base de données
$conn->close();
?>