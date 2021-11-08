<?php
// Read the JSON file from the root folder of the website
$jsonFile = file_get_contents("users.json");
$users = json_decode($jsonFile);

if ($_GET['action'] == 'getUsers') {
    echo $jsonFile;
} else if ($_GET['action'] == 'getUser') {
    // Declare the userSelected variable - used to save the object of the username that was clicked on previous page
    $userSelected = "";

    // Loops through all the users in the database
    foreach ($users as $user) {
        // Checks the ID of the selected user, to find the same id in the database. Then saves that user in the variable
        if ($_GET['userid'] == $user->id) {
            $userSelected = $user;
        }
    }
    echo json_encode($userSelected);
} else if ($_GET['action'] == 'getMatches') {
    // Declare the userSelected variable - used to save the object of the username that was clicked on previous page
    $userSelected = "";

    // Loops through all the users in the database
    foreach ($users as $user) {
        // Checks the ID of the selected user, to find the same id in the database. Then saves that user in the variable
        if ($_GET['userid'] == $user->id) {
            $userSelected = $user;
        }
    }

    $matchCount = 0;
    $matches = [];
    foreach ($users as $user) {
        $ageRange = 4;
        $minAge = $user->age - $ageRange;
        $maxAge = $user->age + $ageRange;
        $gender = $user->gender;
        $lookingFor = $user->lookingFor;
        $id = $user->id;

        if ($userSelected->age >= $minAge && $userSelected->age <= $maxAge && $userSelected->lookingFor == $gender && $lookingFor == $userSelected->gender && $id != $userSelected->id) {
            // Add 1 to the match count. Used to display how many matches was found
            $matchCount++;
            array_push($matches, $user);
        }
    }

    echo json_encode($matches);
} else if ($_GET['action'] == 'createUser') {
    $newUser = json_decode(file_get_contents("php://input"));
    array_push($users, $newUser);
    $encoded = json_encode($users);
    $fp = fopen('users.json', 'w');
    fwrite($fp, $encoded);
    fclose($fp);
    echo $encoded;
} else if ($_GET['action'] == 'updateUser') {
    $userToupdate = json_decode(file_get_contents("php://input"));

    foreach ($users as $user) {
        if ($user->id == $userToupdate->id) {
            $user->name = $userToupdate->name;
            $user->age = $userToupdate->age;
            $user->gender = $userToupdate->gender;
            $user->lookingFor = $userToupdate->lookingFor;
            $user->image = $userToupdate->image;
            $encoded = json_encode($users);
            $fp = fopen('users.json', 'w');
            fwrite($fp, $encoded);
            fclose($fp);
            echo $encoded;
        }
    }
} else if ($_GET['action'] == 'deleteUser') {
    $newUsersArray = [];
    foreach ($users as $user) {
        if ($user->id != $_GET['userid']) {
            array_push($newUsersArray, $user);
        }
    }
    $encoded = json_encode($newUsersArray);
    $fp = fopen('users.json', 'w');
    fwrite($fp, $encoded);
    fclose($fp);
    echo $encoded;
}
