<?php

// CORS preflight and headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Force Laravel to treat every request as an API call (prevents HTML view rendering on errors)
$_SERVER['HTTP_ACCEPT'] = 'application/json';

ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);

// Redirect Laravel writable paths to Vercel's ephemeral /tmp storage
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/sessions', '/framework/cache', '/logs'] as $dir) {
    if (!is_dir($storagePath . $dir)) {
        @mkdir($storagePath . $dir, 0777, true);
    }
}

putenv('VIEW_COMPILED_PATH=' . $storagePath . '/framework/views');

// Forward Vercel serverless requests to Laravel entrypoint
require __DIR__ . '/../public/index.php';