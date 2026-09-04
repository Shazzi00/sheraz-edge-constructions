<?php

// Preserve original script execution path for Laravel routing
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';

// Handle OPTIONS preflight requests directly and exit to avoid duplicate headers
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
    http_response_code(200);
    exit();
}

// Silence PHP deprecation warnings and enforce JSON accept header
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('display_errors', '0');
$_SERVER['HTTP_ACCEPT'] = 'application/json';

// Prepare Vercel serverless writable storage directories
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/sessions', '/framework/cache', '/logs'] as $dir) {
    if (!is_dir($storagePath . $dir)) {
        @mkdir($storagePath . $dir, 0777, true);
    }
}

// Boot Laravel cleanly (Laravel HandleCors will safely attach non-duplicate headers)
require __DIR__ . '/../public/index.php';