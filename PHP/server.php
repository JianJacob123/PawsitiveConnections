<?php 
    header('Access-Control-Allow-Origin: *');
    $connection = new mysqli("localhost", "root", "", "petweb");

    function sanitize_input($data) {
        return htmlspecialchars(stripslashes(trim($data)));
    }

    if (mysqli_connect_error()) {
        echo mysqli_connect_error();
        exit();
    } else {
        // Sanitize input data
        $email = sanitize_input($_POST['email']);
        $pass = sanitize_input($_POST['pass']);
        $fname = sanitize_input($_POST['fname']);
        $lname = sanitize_input($_POST['lname']);
        $address = sanitize_input($_POST['address']);
        $phone = sanitize_input($_POST['phone']);
        
        // Check if the email already exists
        $checkEmailStmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $emailResult = $checkEmailStmt->get_result();

        if ($emailResult->num_rows > 0) {
            // Email already exists in the database
            echo "Email is already registered.";
        } else {
            // Proceed with registration if email does not exist
            $insertUserStmt = $connection->prepare("INSERT INTO users(email, pass, fname, lname, address, phone) VALUES (?, ?, ?, ?, ?, ?)");
            $insertUserStmt->bind_param("ssssss", $email, $pass, $fname, $lname, $address, $phone);
            $insertResult = $insertUserStmt->execute(); 
    
            if ($insertResult) {
                echo "Success, User inserted successfully";
            } else {
                echo "Error, Data is not inserted successfully";
            }
            $insertUserStmt->close();
        }
        $checkEmailStmt->close();
        $connection->close();
    }
?>
