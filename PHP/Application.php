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

        if($_SERVER['REQUEST_METHOD'] === 'GET'){

        $countapprovedsql = "SELECT COUNT(application_id) AS approve_count FROM adoption_application WHERE application_status = 'approved'";
        $countapprovedRes = mysqli_query($conn, $countapprovedsql);
        $approved = $countapprovedRes->fetch_assoc();

        $appsql = "SELECT application_id, fname, lname, application_date, application_status FROM adoption_application INNER JOIN users ON users.user_id = adoption_application.user_id WHERE application_status = 'pending'";
        $appRes = mysqli_query($conn, $appsql);

        if(mysqli_num_rows($appRes) >= 0 && $approved){

        $applications = $appRes->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['status' => 'success', 'app' => $applications, 'countapproved' => $approved]);
        } else {
            echo json_encode(['status' => 'failed']);
        }

        }
    }
?>