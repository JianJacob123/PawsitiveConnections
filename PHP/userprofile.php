<?php
    session_start();
    header('Access-Control-Allow-Origin: http://localhost:3000'); // Change this to your frontend URL
    header('Access-Control-Allow-Credentials: true'); // Allow credentials
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, DELETE");

    $conn = new mysqli("localhost", "root", "", "petweb");

    if (mysqli_connect_error()) {
        echo "Connection failed: " . mysqli_connect_error();
        exit();
    } else {

        $user = $_SESSION['user'] ?? null;
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if($user){
                $sql = "SELECT fname, lname, email, address, phone, application_status FROM users
                        LEFT JOIN adoption_application
                        ON adoption_application.user_id = users.user_id
                        WHERE email = ?";
                
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $user);
                $stmt->execute();

            $result = $stmt->get_result();

                $sql2 = "SELECT list_id, pet_name, listing_date, is_approved FROM petlisting
                        INNER JOIN pets
                        on pets.pet_id = petlisting.pet_id
                        INNER JOIN users
                        on users.user_id = petlisting.user_id
                        WHERE email = ?";
                
                $stmt2 = $conn->prepare($sql2);
                $stmt2->bind_param("s", $user);
                $stmt2->execute();

                $result2 = $stmt2->get_result();
                
        
            if ($result->num_rows > 0 && $result2->num_rows >= 0) {
                $users = $result->fetch_all(MYSQLI_ASSOC); // to select all users
                $list = $result2->fetch_all(MYSQLI_ASSOC); //to select all petlist of pets
                echo json_encode(['status' => 'success', 'data' => $users, 'list' => $list]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Users not found']);
            }
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Session is not set']);
        }

        }

        $conn->close();
    }
?>
