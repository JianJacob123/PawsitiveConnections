<?php
    session_start();
    header('Access-Control-Allow-Origin: http://localhost:3000'); // Change this to your frontend URL
    header('Access-Control-Allow-Credentials: true'); // Allow credentials
    header('Content-Type: application/json');
    $conn = new mysqli("localhost", "root", "", "petweb");

    if (mysqli_connect_error()) {
        echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()]);
        exit();
    } else {
        $loginEmail = $_POST['loginEmail'];
        $loginPass = $_POST['loginPass'];

        
    
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND pass = ?");
        $stmt->bind_param("ss", $loginEmail, $loginPass);
        $stmt->execute();
        $result = $stmt->get_result();

        
        if (mysqli_num_rows($result) > 0) {
            $userData = $result -> fetch_assoc();
            $_SESSION['user'] = $loginEmail;
            echo json_encode(['status'=>'success',  'user' => $_SESSION['user'],'fname' => $userData['fname']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found or incorrect credentials']);
        }

        $stmt->close();
        $conn->close();
    }
?>
