<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
include("mysql.php");


// +----------------------------------------------------+
// | GET Methods being called with identifier "action" |
// +----------------------------------------------------+
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action == "logout") {
        session_destroy();
        $response['authenticated'] = FALSE;
        echo json_encode($response);
    }
}

// +----------------------------------------------------+
// | POST Methods being called with identifier "action" |
// +----------------------------------------------------+

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    // LOGIN
    if ($action == "login") {
        $loginObject = json_decode(file_get_contents('php://input'));
        $username = $loginObject->username;
        $password = $loginObject->password;

        // Get the users login information
        $sql = "SELECT * FROM userlogin WHERE username = '$username' LIMIT 1";
        $result = $mySQL->query($sql);

        // Check if the usernam exists
        if ($result->num_rows == 1) {
            $data = $result->fetch_object();
            // Check if it is the right password for that username
            if (password_verify($password, $data->pass)) {
                $sql = "SELECT * FROM userlist WHERE userID = " . $data->id;
                $user = $mySQL->query($sql)->fetch_object();
                $response['authenticated'] = TRUE;
                $response['userData'] = $user;
                echo json_encode($response);
            } else {
                $response['authenticated'] = FALSE;
                $response['error'] = "Wrong password";
                echo json_encode($response);
            }
        } else {
            $response['authenticated'] = FALSE;
            $response['error'] = "User doesn't exist";
            echo json_encode($response);
        }
    }


    // SIGN UP
    if ($action == "signup") {
        $loginObject = json_decode(file_get_contents('php://input'));
        $username = $loginObject->username;
        $password = $loginObject->password;
        $passwordCheck = $loginObject->passwordCheck;

        if (!empty($username) && !empty($password)) {
            // Check if passwords are the same
            if ($password == $passwordCheck) {

                // Check if username already exists
                $sql = "SELECT id FROM userlogin WHERE username = '$username'";
                $result = $mySQL->query($sql);

                // If the username does not exist, then create a new user
                if ($result->num_rows == 0) {
                    $passEncrypt = password_hash($loginObject->password, PASSWORD_DEFAULT);
                    $firstname = $loginObject->firstname;
                    $lastname = $loginObject->lastname;
                    $age = $loginObject->age;
                    $country = "Denmark"; // default for now
                    $gender = $loginObject->gender;

                    $sql = "CALL CreateUser('$firstname', '$lastname', '$age', '$username', '$passEncrypt', '$country', '$gender')";
                    if ($mySQL->query($sql) === TRUE) {
                        $response['signupSuccess'] = TRUE;
                        echo json_encode($response);
                    } else {
                        $response['signupSuccess'] = FALSE;
                        $response['error'] = "Signup failed. Please try again.";
                        echo json_encode($response);
                    }
                } else {
                    $response['signupSuccess'] = FALSE;
                    $response['error'] = "Signup failed. Username taken.";
                    echo json_encode($response);
                }
            } else {
                $response['signupSuccess'] = FALSE;
                $response['error'] = "Signup failed. Passwords not the same.";
                echo json_encode($response);
            }
        } else {
            $response['signupSuccess'] = FALSE;
            $response['error'] = "Signup failed. Please fill out all fields.";
            echo json_encode($response);
        }
    }
}
