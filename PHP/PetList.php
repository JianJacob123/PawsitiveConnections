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
            $sql = "SELECT list_id, fname, lname, pet_name, animal_type, images_url, is_approved FROM petlisting
INNER JOIN pets
on pets.pet_id = petlisting.pet_id
INNER JOIN users
on users.user_id = petlisting.user_id
INNER JOIN images
on pets.pet_id = images.pet_id WHERE is_approved = 'pending'";

            $result = mysqli_query($conn, $sql);
        
            if (mysqli_num_rows($result) >= 0) {
                $list = $result->fetch_all(MYSQLI_ASSOC); // to select all users
                echo json_encode(['status' => 'success', 'data' => $list]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'list not found']);
            }
        }

        $conn->close();
    }
?>
