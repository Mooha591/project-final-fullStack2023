<?php
require_once("./pdo.php");
$id = $_GET["id"] ?? ''; // permet de récupérer l'id de l'utilisateur connecté
$stmt = $pdo->prepare("SELECT * FROM task WHERE user_id = :id"); // permet de récupérer les tâches de l'utilisateur connecté 
$stmt->execute([
    "id" => $id
]);

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);



echo json_encode($rows);
