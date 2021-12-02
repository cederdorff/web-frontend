<?php
    session_start();
    
    // Redirect user if they are not logged in
    if(!$_SESSION['login']) {
        header('location: index.php');
        exit;
    }

    include("mysql.php");
    // Get all info about the logged in user from the database
    $sql = "SELECT * FROM userlist WHERE userID = " . $_SESSION['userID'];
    $user = $mySQL->query($sql)->fetch_object();
?>

<center>
    <?php
        echo "
            Welcome $user->username<br><br>

            I can see you live in $user->countryName
        ";
    ?>

    <br><br><br>
    <a href="backend.php?action=logout">Logout</a>
</center>
