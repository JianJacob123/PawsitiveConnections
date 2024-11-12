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
            $sql = "SELECT adoption_id, fname, lname, address, phone, pet_name, adoption_date FROM adoptions
                    INNER JOIN petlisting
                    on petlisting.list_id = adoptions.list_id
                    INNER JOIN pets
                    ON pets.pet_id = petlisting.pet_id
                    INNER JOIN users
                    on users.user_id = adoptions.adopter_user_id";

            $result = mysqli_query($conn, $sql);
        
            if (mysqli_num_rows($result) > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC); // to select all users
                echo json_encode(['status' => 'success', 'data' => $data]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Users not found']);
            }
        }

        $conn->close();
    }
?>
