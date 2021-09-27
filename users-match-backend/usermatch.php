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

    // Prints the selected user's name
    echo "<center>";
    echo "You selected the user<br>";
    echo "
        <h2>
            $userSelected->firstname<br>
            <small>Age: $userSelected->age, Gender: $userSelected->gender</small>
        </h2>";


    // Prints out the matches for the selected user - condition: age must not be more than 2 years apart, and gender must not be the same
    echo "These are the matches:<br><br>";

    $matchCount = 0;
    foreach($userDB as $user) {
        $ageRange = 2;
        $minAge = $user->age - $ageRange;
        $maxAge = $user->age + $ageRange;
        $gender = $user->gender;

        if($userSelected->age >= $minAge && $userSelected->age <= $maxAge && $userSelected->gender != $gender) {
            // Add 1 to the match count. Used to display how many matches was found
            $matchCount++;
            echo "$user->firstname, Age: $user->age, Gender: $user->gender<br>";
        }
    }

    echo "<br>";
    echo "There is a total of <b>$matchCount</b> match";
    // Appends the text "es" if the match count is not 1
    if($matchCount != 1) { echo "es"; }

?>