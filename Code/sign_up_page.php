<?php
$error = isset($_GET['error']) ? $_GET['error'] : '';
header("Location: sign_up_redirect.php?toast=$error");
?>