<?php
    // Includes the user database, generated from JSON
    include('userData.php');

    // Declare the userSelected variable - used to save the object of the username that was clicked on previous page
    $userSelected = "";

    // Loops through all the users in the database
    foreach($userDB as $user) {
        // Checks the ID of the selected user, to find the same id in the database. Then saves that user in the variable
        if($_GET['userid'] == $user->id) {
            $userSelected = $user;
        }
    }
    

    $matchCount = 0;
    $matches = [];
    foreach($userDB as $user) {
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
?>