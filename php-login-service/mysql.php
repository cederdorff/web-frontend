<?php
$server = "127.0.0.1"; // Change to domain name, e.g. www.iloveunicorns.com
$username = "root"; // Change to the admins username of the server
$password = "1234FEDCBA"; // Change to the admins password of the server
$database = "dating_website"; // Change to the name of the database you would like to connect to on the server

$mySQL = new mysqli($server, $username, $password, $database);

// var_dump($mySQL);

if (!$mySQL) {
    die("Could not connect to the MySQL server: " . mysqli_connect_error());
}
