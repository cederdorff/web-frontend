<head>
    <link href="style.css" rel="stylesheet">
</head>

<?php
    include('userData.php');

    echo "<center>";
    echo "Select a user, to find some matches for that person.<br><br>";

    // Generates a list of all the users in the database
    foreach($userDB as $user) {
        echo "
            <a href=usermatch.php?userid=$user->id>
                $user->firstname
            </a>
            <br>
        ";
    }
?>