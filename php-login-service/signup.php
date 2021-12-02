<?php
    include("mysql.php");

    // Get full list of countries from database
    $sql = "SELECT countryName FROM countries ORDER BY countryName ASC";
    $result = $mySQL->query($sql);
?>

<center>
    <form action="backend.php" method="post">
        * Username:<br>
        <input type="text" name="username"><br><br>

        * Password:<br>
        <input type="password" name="password"><br><br>

        * Retype password:<br>
        <input type="password" name="passwordCheck"><br><br>

        Firstname:<br>
        <input type="text" name="firstname"><br><br>

        Lastname:<br>
        <input type="text" name="lastname"><br><br>

        Age:<br>
        <input type="number" name="age" value="0"><br><br>

        Gender:<br>
        <select name="gender">
            <option value="">- Choose Gender -</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
        </select><br><br>

        Country:<br>
        <select name="country">
            <?php
                while($row = $result->fetch_object()) {
                    echo "
                        <option>$row->countryName</option>
                    ";
                }
            ?>
        </select><br><br>

        <input type="submit" value="Create user">
        <input type="hidden" name="action" value="signup">
    </form>

    <br>
    <a href="index.php">Back to login</a>
</center>

