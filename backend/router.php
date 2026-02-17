<?php
if (php_sapi_name() == 'cli-server') {
    $url = parse_url($_SERVER["REQUEST_URI"]);
    $file = __DIR__ . '/public' . $url["path"];
    
    // If a file exists, serve it directly
    if (is_file($file)) {
        return false;
    }
}

// Otherwise, route everything through the Laravel index.php
require_once __DIR__ . '/public/index.php';
