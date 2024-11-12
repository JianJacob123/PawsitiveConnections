<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, DELETE");

    $conn = new mysqli("localhost", "root", "", "petweb");

    if (mysqli_connect_error()) {
        echo "Connection failed: " . mysqli_connect_error();
        exit();
    } else {
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $sql = "SELECT user_id, fname, lname, email FROM users";
            $result = mysqli_query($conn, $sql);
        
            if (mysqli_num_rows($result) > 0) {
                $users = $result->fetch_all(MYSQLI_ASSOC); // to select all users
                echo json_encode(['status' => 'success', 'data' => $users]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Users not found']);
            }
        }

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $userid = $_GET['id'];

            $deletesql = ("DELETE FROM users WHERE user_id = $userid");
            $deleteresult = mysqli_query($conn, $deletesql);

            if($deleteresult){
                echo json_encode(['message' => 'success']);
            } else{
                echo json_encode(['message' => 'error']);
            }
        }
        $conn->close();
    }
?>
