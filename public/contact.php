<?php
/*************************************************************************
 *  ABS Educational Solution – Simple PHP Mail Handler
 *  Uses PHPMailer + Brevo SMTP  (falls back to `mail()` if SMTP fails)
 *
 *  1.  composer require phpmailer/phpmailer   # once
 *  2.  copy this file next to /public (or anywhere PHP executes)
 *  3.  update the constants below
 *************************************************************************/

// ─────────  CONFIG – edit these  ─────────────────────────────────────────
const TO_EMAIL   = 'bwtnaresh@gmail.com';
const TO_NAME    = 'ABS Lead Desk';
const SUBJECT    = 'New Website Enquiry';

const BREVO_SMTP = [            // Get these from Brevo dashboard
  'host'   => 'smtp-relay.brevo.com',
  'port'   => 587,
  'user'   => '547c1e001@smtp-brevo.com',
  'pass'   => 'nt9cC1f3aw4hNxUO'
];
// ─────────────────────────────────────────────────────────────────────────


// 1.  Basic spam-honeypot check
if (!empty($_POST['abs_hp'])) {
  http_response_code(400);
  exit('Spam rejected');
}

// 2.  Sanitize inputs
$name    = htmlspecialchars(trim($_POST['name']  ?? ''), ENT_QUOTES);
$phone   = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES);
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$query   = htmlspecialchars(trim($_POST['query'] ?? ''), ENT_QUOTES);

if (!$name || !$phone || !$email || !$query) {
  http_response_code(422);
  exit('All fields are required.');
}

// 3.  Build the email body (simple HTML table)
$body = "
  <h2>New Website Enquiry</h2>
  <table cellpadding='6' cellspacing='0' border='1'>
    <tr><th align='left'>Name</th><td>{$name}</td></tr>
    <tr><th align='left'>Phone</th><td>{$phone}</td></tr>
    <tr><th align='left'>Email</th><td>{$email}</td></tr>
    <tr><th align='left'>Query</th><td>{$query}</td></tr>
  </table>
";

require __DIR__ . '/vendor/autoload.php';           // ← PHPMailer via Composer
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
try {
  // Brevo SMTP
  $mail->isSMTP();
  $mail->Host       = BREVO_SMTP['host'];
  $mail->SMTPAuth   = true;
  $mail->Username   = BREVO_SMTP['user'];
  $mail->Password   = BREVO_SMTP['pass'];
  $mail->Port       = BREVO_SMTP['port'];
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

  // Headers
  $mail->setFrom($email, $name);          // “reply-to” sender
  $mail->addAddress(TO_EMAIL, TO_NAME);   // you
  $mail->addReplyTo($email, $name);

  $mail->Subject = SUBJECT;
  $mail->isHTML(true);
  $mail->Body    = $body;

  $mail->send();
  // Success – return JSON so fetch() can react
  header('Content-Type: application/json');
  echo json_encode(['ok' => true]);
} catch (Throwable $e) {
  // Fallback to PHP’s mail() if SMTP fails (optional)
  $headers  = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8\r\n";
  $headers .= "From: {$name} <{$email}>\r\n";
  if (mail(TO_EMAIL, SUBJECT, $body, $headers)) {
    echo json_encode(['ok' => true, 'fallback' => 'phpmail']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Mailer Error', 'debug' => $e->getMessage()]);
  }
}
