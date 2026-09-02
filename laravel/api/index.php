<?php

ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);

// Forward Vercel serverless requests to Laravel entrypoint
require __DIR__ . '/../public/index.php';