<?php
    session_start();
    header('Access-Control-Allow-Origin: http://localhost:3000'); // Change this to your frontend URL
    header('Access-Control-Allow-Credentials: true'); // Allow credentials
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $conn = new mysqli("localhost", "root", "", "petweb");

    if (mysqli_connect_error()) {
        echo "Connection failed: " . mysqli_connect_error();
        exit();
    } else {

        $user = $_SESSION['user'] ?? null;
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if($user){
                $sql = "SELECT list_id, pet_name, listing_date, animal_type, images_url, is_approved, list_status FROM petlisting
                        INNER JOIN pets
                        on pets.pet_id = petlisting.pet_id
                        INNER JOIN users
                        on users.user_id = petlisting.user_id
                        INNER JOIN images
                        on pets.pet_id = images.pet_id WHERE is_approved = 'approved' AND list_status = 'not adopted' AND email = ?";
                
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $user);
                $stmt->execute();

            $result = $stmt->get_result();

                $sql2 = "SELECT user_id, fname, lname FROM users";

                    $stmt2 = $conn->prepare($sql2);
                    $stmt2->execute();

                    $result2 = $stmt2->get_result();
                
        
            if ($result->num_rows >= 0 && $result2->num_rows > 0) {
                $list = $result->fetch_all(MYSQLI_ASSOC); // to select all users
                $users = $result2->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['status' => 'success', 'data' => $list, 'users' => $users]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Users not found']);
            }
            $stmt->close();
            $stmt2->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Session is not set']);
        }

        } else if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $data = json_decode(file_get_contents('php://input'), true);

            $listid = $data['list_id'] ?? null;
            $userid = $data['user_id'] ?? null;
            $date = $data['date'] ?? null;

            $conn->begin_transaction();

            try{
                $stmt1 = $conn->prepare("UPDATE petlisting SET list_status = 'adopted' WHERE list_id = ?");
                $stmt1->bind_param("i", $listid);
                $stmt1->execute();
                
                $stmt2 = $conn->prepare("INSERT INTO adoptions (list_id, adopter_user_id, adoption_date)
                VALUES (?, ?, ?)");
                $stmt2->bind_param("iis", $listid, $userid, $date);
                $stmt2->execute();

                $conn->commit();
                echo json_encode(['status' => 'success', 'message' => 'Pet Marked As Adopted']);
            } catch (Exception $e){
                $conn->rollback();
                echo json_encode(['status' => 'error', 'message' => 'Pet Not Marked As Adopted']);

            }
        }

        $conn->close();
    }
?>
