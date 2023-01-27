
<?php
require_once("pdo.php");

$data = json_decode(file_get_contents("php://input"), true); // permet de récupérer les données envoyées par le front-end
$user_id = htmlentities($data["user_id"]); // on récupère l'id de l'utilisateur connecté

$sql = "DELETE FROM task WHERE task_id = :task_id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    "task_id" => $data["task_id"], // permet de récupérer l'id de la tâche à supprimer dans la base de données
]);

echo json_encode(["success" => "task deleted"]);
