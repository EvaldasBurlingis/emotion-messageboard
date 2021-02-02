<?php declare( strict_types = 1 );

require "../src/database/DatabaseClass.php";
require "../src/helpers/Helper.php";
require "../src/helpers/Validator.php";
require "../src/models/Message.php";
require "../src/config/database.php";

$db = new \App\Database($dsn, $username, $password, $options);

/**
 * Handle GET requests
 */
if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) {
    $messages= $db->fetchAll(Message::all());
    $messages = array_reverse($messages);

    header('Content-Type: application/json');
    echo json_encode($messages);
}

/**
 * Handle POST requests
 */
if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    $errors = [];
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    if (!App\Validator::fullname($data->fullname)) array_push($errors, ["fullname" => "Invalid fullname"]);
    if ($data->email !== "" && !App\Validator::email($data->email)) array_push($errors, ["email" => "Invalid email"]);
    if (!App\Validator::datetime($data->birthdate)) array_push($errors, ["birthdate" => "Invalid birthdate"]);

    if (count($errors) === 0) {
        
        date_default_timezone_set('Europe/Vilnius');
        $new_message = array(
            "created_at" => date('Y-m-d h:i:s', time()),
            "fullname"   => App\Helper::sanitize($data->fullname),
            "birthdate"  => App\Helper::sanitize($data->birthdate),
            "email"      => $data->email !== '' ? App\Helper::sanitize($data->email) : '',
            "message"    => App\Helper::sanitize($data->message)
        );

        $db->insert(Message::create($new_message), $new_message);

        $errors = [];
        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode(['message' => 'Message added successfully']);
    } else {
        header('Content-Type: application/json');
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
    }
}