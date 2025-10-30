<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Direct access not allowed');
}

// Configuration
$to = "info@albassamgroups.com";
$subject = "New Contact Form Submission - Al Bassam Groups";

// Get and sanitize form data
$firstName = isset($_POST['Fname']) ? strip_tags(trim($_POST['Fname'])) : '';
$lastName = isset($_POST['Lname']) ? strip_tags(trim($_POST['Lname'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill all required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Build email body
$emailBody = "New Contact Form Submission\n\n";
$emailBody .= "First Name: $firstName\n";
$emailBody .= "Last Name: $lastName\n";
$emailBody .= "Email: $email\n\n";
$emailBody .= "Message:\n$message\n";

// Email headers
$headers = "From: noreply@albassamgroups.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $emailBody, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
}
?>