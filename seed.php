<?php declare( strict_types = 1 );

use PDO;
require "src/config/database.php";

try {
    $connection = new PDO("mysql:host=$host", $username, $password, $options); 
    $sql = file_get_contents("data/init.sql");  
    $connection->exec($sql);

    echo "Success!<br/><br/>";
    echo "&#9989; Database: message_board created <br/>";
    echo "&#9989; Table messages created<br/>";
    echo "&#9989; Table messages seeded<br/>";

} catch(PDOException $error) {
    echo $error;
    echo "Failure <br/>";
    echo "Remove message_board database if it exist<br/>";
    echo "<a href='/'>Go to main page</a>";
}