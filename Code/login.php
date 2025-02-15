<?php
$showToast = isset($_GET['toast']) && $_GET['toast'] == 1;
header("Location: log_in_redirect.php?toast=$showToast");
?>
