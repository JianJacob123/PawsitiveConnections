<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:3000'); // Specify your exact frontend origin
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

$conn = new mysqli("localhost", "root", "", "petweb");

if (mysqli_connect_error()) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()]);
    exit();
}

$user = $_SESSION['user'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($user) {
        $getidsql = "SELECT user_id FROM users WHERE email = ?";
        $getidstmt = $conn->prepare($getidsql);
        $getidstmt->bind_param("s", $user);
        $getidstmt->execute();
        $idresult = $getidstmt->get_result();

        if ($idresult->num_rows > 0) {
            $row = $idresult->fetch_assoc();
            $id = $row['user_id'];

            $getinfosql = "SELECT fname, lname, address, phone FROM users WHERE user_id = ?";
            $getinfostmt = $conn->prepare($getinfosql);
            $getinfostmt->bind_param("i", $id);
            $getinfostmt->execute();
            $getinforesult = $getinfostmt->get_result();

            if ($getinforesult->num_rows > 0) {
                $data = $getinforesult->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['status' => 'success', 'data' => $data]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No user information found.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No user found with that email.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Session user is not set.']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($user) {
        // Retrieve POST variables
        $date = $_POST['date'] ?? null;
        $occupation = $_POST['occupation'] ?? null;
        $salary = $_POST['salary'] ?? null;
        $residencetype = $_POST['residencetype'] ?? null;
        $homeorrent = $_POST['homeorrent'] ?? null;
        $prevownership = $_POST['prevownership'] ?? null;
        $longtermcommitment = $_POST['longtermcommitment'] ?? null;
        $description = $_POST['description'] ?? null;
        $status = 'pending';

        // Get user ID
        $getidsql = "SELECT user_id FROM users WHERE email = ?";
        $getidstmt = $conn->prepare($getidsql);
        $getidstmt->bind_param("s", $user);
        $getidstmt->execute();
        $idresult = $getidstmt->get_result();

        if ($idresult->num_rows > 0) {
            $row = $idresult->fetch_assoc();
            $id = $row['user_id'];

            $sql = "INSERT INTO adoption_application (user_id, residence_type, owns_or_rents, previous_pet_ownership,
                    long_term_commitment, motivation, application_date, application_status, occupation, salary)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isssssssss", $id, $residencetype, $homeorrent, $prevownership, 
                $longtermcommitment, $description, $date, $status, $occupation, $salary);
            
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Application submitted successfully.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error submitting application.']);
            }
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No user found with that email.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Session user is not set.']);
    }
}

$conn->close();
?>
