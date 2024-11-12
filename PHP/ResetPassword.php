<?php
require '../vendor/autoload.php';
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json'); // Ensure JSON response header

$conn = new mysqli("localhost", "root", "", "petweb");

if (mysqli_connect_error()) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()]);
    exit();
}

$token = $_POST['token'];
$newPassword = $_POST['password'];

if (!empty($token) && !empty($newPassword)) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE reset_token = ? AND token_expiry > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Token is valid

        $updateStmt = $conn->prepare("UPDATE users SET pass = ?, reset_token = NULL, token_expiry = NULL WHERE reset_token = ?");
        $updateStmt->bind_param("ss", $newPassword, $token);
        $updateStmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Password has been updated successfully.']);
        $updateStmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid token and password.']);
}

$conn->close();
?>
