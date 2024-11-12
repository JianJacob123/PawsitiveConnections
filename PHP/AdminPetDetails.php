<?php
    session_start();
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $conn = new mysqli("localhost", "root", "", "petweb");

    if (mysqli_connect_error()) {
        echo "Connection failed: " . mysqli_connect_error();
        exit();
    } else {
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $id = $_GET['id'];
            $sql = "SELECT list_id, fname, lname, address, pet_name, age, breed, animal_type, gender, description, images_url FROM petlisting
INNER JOIN pets
on pets.pet_id = petlisting.pet_id
INNER JOIN users
on users.user_id = petlisting.user_id
INNER JOIN images
on pets.pet_id = images.pet_id WHERE list_id = $id;";
            $result = mysqli_query($conn, $sql);
        
            if (mysqli_num_rows($result) > 0) {
                $list = $result->fetch_all(MYSQLI_ASSOC); // to select all users
                echo json_encode(['status' => 'success', 'data' => $list]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'list not found']);
            }
        }

        if ($_SERVER['REQUEST_METHOD'] === 'PATCH'){
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['listid'] ?? null;
            $updatedField = $data['updatedfield'] ?? null;

            $sql = "UPDATE petlisting SET is_approved = ?  WHERE list_id = ?";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $updatedField, $id);
            $updatedresult = $stmt->execute();
            

            if($updatedresult){
                echo json_encode(['status' => 'success', 'message' => 'Pet List Approved']);
            } else {
                echo json_encode(['status' => 'failed', 'message' => 'Problem Occured']);
            }
        }


        $conn->close();
    }
?>
