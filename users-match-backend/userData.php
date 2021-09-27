<?php
    // Read the JSON file from the root folder of the website
    $jsonFile = file_get_contents("userDatabase.json");

    // Decode (convert) the JSON file to an array og objects to be used in PHP 
    $userDB = json_decode($jsonFile, false);

    /*
        Properties of the userDB class:
        -id
        -firstname
        -lastname
        -age
        -haircolor
        -countryName
        -gender
    */
?>