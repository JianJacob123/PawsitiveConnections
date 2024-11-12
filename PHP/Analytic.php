<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    $conn = new mysqli("localhost", "root", "", "petweb");

    if (mysqli_connect_error()) {
        echo "Connection failed: " . mysqli_connect_error();
        exit();
    } else {
        
        $sql = ("SELECT COUNT(user_id) AS total_registered_user FROM users ");
        $Countresult = mysqli_query($conn, $sql);
        $totaluser = mysqli_fetch_assoc($Countresult)['total_registered_user'];

        $sql2 = ("SELECT COUNT(adoption_id) as total_adoption FROM adoptions");
        $Countresult2 = mysqli_query($conn, $sql2);
        $totaladopted = mysqli_fetch_assoc($Countresult2)['total_adoption'];



        
        if ($totaluser && $totaladopted) {
            
            echo json_encode(['status' => 'success', 'total_registered_user' =>  $totaluser, 'total_adoptions' => $totaladopted]);

        } else {
            echo json_encode(['status' => 'error', 'message' => 'No users were registered']);
        }

        $conn->close();
    }
?>
