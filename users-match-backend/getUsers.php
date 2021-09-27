<?php
    // Read the JSON file from the root folder of the website
    $jsonFile = file_get_contents("userDatabase.json");
    echo $jsonFile;
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