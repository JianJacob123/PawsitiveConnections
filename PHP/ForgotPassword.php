<?php
session_start();
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

date_default_timezone_set('Asia/Manila');

$conn = new mysqli("localhost", "root", "", "petweb");

if (mysqli_connect_error()) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()]);
    exit();
}

$email = trim($_POST['email']);

if (!empty($email)) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $token = bin2hex(random_bytes(50));
        $expiry = date("Y-m-d H:i:s", strtotime("+1 hour"));
        $expiryFormatted = date("F j, Y, g:i a", strtotime($expiry)); // Format expiry time

        $updateStmt = $conn->prepare("UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?");
        $updateStmt->bind_param("sss", $token, $expiry, $email);
        $updateStmt->execute();

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'jasperjayme79@gmail.com';
            $mail->Password = 'xffi drts kdmp uuiu';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('no-reply@yourdomain.com', 'Pawsitive Connection');
            $mail->addAddress($email);
            $mail->isHTML(true);

            $resetLink = 'http://localhost:3000/ResetPassword?token=' . urlencode($token);
            $mail->Subject = 'Password Reset Request';
            $mail->Body = '<b><p>Dear User, </p></b>
                            <p>Please click the following link to reset your password:</p>
                            <p><a href="' . $resetLink . '">Reset Password</a></p>
                            <p>The link will expire on ' . $expiryFormatted . '.</p>';

            $mail->send();
            echo json_encode(['status' => 'success', 'message' => 'Please check your inbox for reset instructions.']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send reset email. Mailer Error: ' . $mail->ErrorInfo]);
        }

        $updateStmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'This email is not registered.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
}

$conn->close();
?>
