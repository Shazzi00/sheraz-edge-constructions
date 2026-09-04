<?php

$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';

// Bootstrap SSL CA Certificate for TiDB Cloud Serverless
$caPath = '/tmp/cacert.pem';
if (!file_exists($caPath)) {
    $systemPaths = [
        '/etc/pki/tls/certs/ca-bundle.crt',
        '/etc/ssl/certs/ca-certificates.crt',
        '/etc/ssl/cert.pem',
        '/etc/pki/tls/cert.pem',
    ];
    $copied = false;
    foreach ($systemPaths as $path) {
        if (file_exists($path) && filesize($path) > 0) {
            @copy($path, $caPath);
            $copied = true;
            break;
        }
    }
    if (!$copied) {
        $pem = @file_get_contents('https://curl.se/ca/cacert.pem');
        if ($pem) {
            @file_put_contents($caPath, $pem);
        }
    }
}

// CORS preflight handling
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
    http_response_code(200);
    exit();
}

error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('display_errors', '0');
$_SERVER['HTTP_ACCEPT'] = 'application/json';

// Create writable storage paths
$storagePath = '/tmp/storage';
foreach (['/framework/views', '/framework/sessions', '/framework/cache', '/logs'] as $dir) {
    if (!is_dir($storagePath . $dir)) {
        @mkdir($storagePath . $dir, 0777, true);
    }
}

try {
    require __DIR__ . '/../public/index.php';
} catch (\Throwable $e) {
    error_log("Laravel Vercel Error: " . $e->getMessage());

    if (!headers_sent()) {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
    }
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    exit();
}