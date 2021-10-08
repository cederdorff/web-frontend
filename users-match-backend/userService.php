<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json; charset=utf-8');
    header("Access-Control-Allow-Headers: Content-Type");
// Read the JSON file from the root folder of the website
    $jsonFile = file_get_contents("users.json");
    $users = json_decode($jsonFile);
     
    if($_GET['action'] == 'getUsers') {
        echo $jsonFile;

    } else if($_GET['action'] == 'getMatches'){
        // Declare the userSelected variable - used to save the object of the username that was clicked on previous page
    $userSelected = "";
    // Decode (convert) the JSON file to an array og objects to be used in PHP 
   
    // Loops through all the users in the database
    foreach($users as $user) {
        // Checks the ID of the selected user, to find the same id in the database. Then saves that user in the variable
        if($_GET['userid'] == $user->id) {
            $userSelected = $user;
        }
    }
    

    $matchCount = 0;
    $matches = [];
    foreach($users as $user) {
        $ageRange = 2;
        $minAge = $user->age - $ageRange;
        $maxAge = $user->age + $ageRange;
        $gender = $user->gender;

        if($userSelected->age >= $minAge && $userSelected->age <= $maxAge && $userSelected->gender != $gender) {
            // Add 1 to the match count. Used to display how many matches was found
            $matchCount++;
            array_push($matches, $user);
        }
    }

    $data = [
        "selectedUser" => $userSelected,
        "matchCount" => $matchCount,
        "matches" => $matches
    ];
    
    echo json_encode($data);

    } else if($_GET['action'] == 'createUser'){
        $newUser = json_decode(file_get_contents("php://input"));
        array_push($users, $newUser);
        $encoded = json_encode($users);
        $fp = fopen('users.json', 'w');
        fwrite($fp, $encoded);
        fclose($fp);
        echo $newUser;
    }
?>