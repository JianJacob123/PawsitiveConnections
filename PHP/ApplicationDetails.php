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
            $sql = "SELECT application_id, fname, lname, address, phone, residence_type, owns_or_rents, previous_pet_ownership, long_term_commitment,
                    motivation, application_date, application_status, occupation, salary FROM adoption_application
                    INNER JOIN users
                    on users.user_id = adoption_application.user_id WHERE application_id = $id;";

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
            $id = $data['appid'] ?? null;
            $updatedField = $data['updatedfield'] ?? null;

            $sql = "UPDATE adoption_application SET application_status = ?  WHERE application_id = ?";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $updatedField, $id);
            $updatedresult = $stmt->execute();
            

            if($updatedresult){
                echo json_encode(['status' => 'success', 'message' => 'Application Approved']);
            } else {
                echo json_encode(['status' => 'failed', 'message' => 'Problem Occured']);
            }
        }

        $conn->close();
    }
?>
