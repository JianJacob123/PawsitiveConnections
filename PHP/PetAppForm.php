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

 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($user) {
        // Retrieve POST variables
        $date = $_POST['date'] ?? null;
        $petname = $_POST['petname'] ?? null;
        $animaltype = $_POST['animaltype'] ?? null;
        $breed = $_POST['breed'] ?? null;
        $gender = $_POST['gender'] ?? null;
        $age = $_POST['age'] ?? null;
        $size = $_POST['size'] ?? null;
        $color = $_POST['color'] ?? null;
        $description = $_POST['description'] ?? null;
        $status = 'not adopted';
        $isapproved = 'pending';
        $image = $_FILES['image'] ?? null;
        $imageURL = '';

        //get imageurl  

        // Check if the upload directory exists
        $uploadDir = __DIR__ . '/../uploads/'; // Adjust according to your structure
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
        }

        // Handle image upload
        if (isset($image) && $image['error'] === UPLOAD_ERR_OK) {
            $uploadFilePath = $uploadDir . basename($image['name']);

            if (move_uploaded_file($image['tmp_name'], $uploadFilePath)) {
                $imageURL = 'http://localhost/AdoptionWebsite/uploads/' . basename($image['name']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Image upload failed.']);
                exit();
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No image uploaded or upload error.']);
            exit();
        }

        // Get user ID
        $getidsql = "SELECT user_id FROM users WHERE email = ?";
        $getidstmt = $conn->prepare($getidsql);
        $getidstmt->bind_param("s", $user);
        $getidstmt->execute();
        $idresult = $getidstmt->get_result();

        if ($idresult->num_rows > 0) {
            $row = $idresult->fetch_assoc();
            $id = $row['user_id'];

            $conn->begin_transaction();

            try{
                $stmt1 = $conn->prepare("INSERT INTO pets (pet_name, animal_type, breed, gender,
                    age, size, color)
                    VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt1->bind_param("sssssss", $petname, $animaltype, $breed, $gender, $age, $size, $color);
                $stmt1->execute();

                $petid = $conn->insert_id;
                
                $stmt2 = $conn->prepare("INSERT INTO petlisting (user_id, pet_id, listing_date, list_status, description, is_approved)
                VALUES (?, ?, ?, ?, ?, ?)");
                $stmt2->bind_param("iissss", $id, $petid, $date, $status, $description, $isapproved);
                $stmt2->execute();


                $stmt3 = $conn->prepare("INSERT INTO images (pet_id, images_url) VALUES (?, ?)");
                $stmt3->bind_param("is", $petid, $imageURL);
                $stmt3->execute();

                $conn->commit();
                echo json_encode(['status' => 'success', 'message' => 'Pet Listed Successfully']);
            } catch (Exception $e){
                $conn->rollback();
                echo json_encode(['status' => 'error', 'message' => 'Pet Not Listed Successfully']);

            }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Session user is not set.']);
    }
  }
 }

$conn->close();
?>
