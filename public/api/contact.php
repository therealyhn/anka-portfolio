<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// CORS — allow only own domain
$allowedOrigins = ['https://ljsc-design.com', 'https://www.ljsc-design.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Load SMTP config
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration missing']);
    exit;
}
$config = require $configFile;

// Parse JSON body
$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request body']);
    exit;
}

// Validate required fields
$name  = trim($body['name'] ?? '');
$email = trim($body['email'] ?? '');
if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Name and valid email are required']);
    exit;
}

// Sanitize optional fields
$company        = trim($body['company'] ?? '-');
$phone          = trim($body['phone'] ?? '-');
$interests      = trim($body['interests'] ?? '-');
$budget         = trim($body['budget'] ?? '-');
$projectDetails = trim($body['project_details'] ?? '-');
$lang           = ($body['lang'] ?? 'en') === 'sr' ? 'sr' : 'en';

$subject = $lang === 'sr'
    ? "Novi upit od {$name} — ljsc-design.com"
    : "New project inquiry from {$name} — ljsc-design.com";

// Build email body
$emailBody = "
New contact form submission — ljsc-design.com
==============================================

Name:            {$name}
Email:           {$email}
Company:         {$company}
Phone:           {$phone}

Interested in:   {$interests}
Budget:          {$budget}

Project details:
{$projectDetails}
";

// Send via PHPMailer if available, otherwise fallback to mail()
if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_user'];
        $mail->Password   = $config['smtp_pass'];
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = (int) $config['smtp_port'];
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($config['smtp_user'], 'ljsc-design.com');
        $mail->addAddress($config['to_email']);
        $mail->addReplyTo($email, $name);

        $mail->Subject = $subject;
        $mail->Body    = $emailBody;

        $mail->send();
        echo json_encode(['success' => true]);
    } catch (\Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to send email']);
    }
} else {
    // Fallback: PHP mail() — works on Hostinger shared hosting
    $headers  = "From: ljsc-design.com <{$config['smtp_user']}>\r\n";
    $headers .= "Reply-To: {$name} <{$email}>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $sent = mail($config['to_email'], $subject, $emailBody, $headers);
    if ($sent) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to send email']);
    }
}
