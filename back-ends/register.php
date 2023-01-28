<?php

require_once('pdo.php'); // connexion à la base de données

// trim permet de supprimer les espaces en début et fin de chaîne, htmlspecialchars permet de convertir les caractères spéciaux en entités HTML pour éviter les injections de code , data permet de récupérer les données envoyées par le front-end.

header("Content-Type: application/json; charset=UTF-8"); // permet d'encoder les données en json
$data = json_decode(file_get_contents("php://input"), true); // permet de récupérer les données envoyées par le front-end
$user_first_name = trim(htmlspecialchars($data["first_name"]));
$user_last_name = trim(htmlspecialchars($data["last_name"]));
$user_email = trim(htmlspecialchars($data["email"]));
$password = password_hash(trim(htmlspecialchars($data["password"])), PASSWORD_ARGON2I);



// si user_first_name, user_last_name, user_email et password existent, on peut créer un nouvel utilisateur dans la base de données
if ($user_first_name && $user_last_name && $user_email && $password) { // si les données sont renseignées, on peut créer un nouvel utilisateur dans la base de données
    $sql = "SELECT * FROM user WHERE email = :email"; // requête pour vérifier si l'email existe déjà dans la base de données, si oui, on ne peut pas créer un nouvel utilisateur avec la même adresse email
    $stmt = $pdo->prepare($sql); // prépare la requête pour éviter les injections SQL, on peut utiliser la méthode prepare() pour préparer une requête SQL à l'exécution et utiliser la méthode execute() pour exécuter la requête préparée avec des valeurs différentes à chaque fois ex: $stmt->execute([ "email" => $user_email ]), on peut utiliser la méthode fetch() pour récupérer les données de la requête SQL ex: $row = $stmt->fetch(PDO::FETCH_ASSOC)

    $stmt->execute([
        "email" => $user_email
    ]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC); // fetch() permet de récupérer les données de la requête SQL et de les stocker dans un tableau associatif





    if ($row) { // row est un tableau associatif qui contient les données de la requête SQL
        echo json_encode(["error" => "email already exist"]);
    } else {
        $sql = "INSERT INTO user (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)"; // requête pour insérer les données dans la table   user de la base de données  si l'email n'existe pas déjà dans la base de données
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "first_name" => $user_first_name,
            "last_name" => $user_last_name,
            "email" => $user_email,
            "password" => $password

        ]);
        // echo json_encode($row);
        echo json_encode(["success" => "user created"]); //success c'est le nom de la clé et "user created" c'est la valeur de la clé
    }
};
