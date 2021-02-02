<?php declare( strict_types = 1 );

$host       = "localhost:3306";
$dbname     = "message_board";
$username   = "root";
$password   = "secret";
$dsn        = "mysql:host=$host;dbname=$dbname";
$options    = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
              ); 