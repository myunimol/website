<?php
error_reporting(0);

putenv("env=development");
require_once 'vendor/autoload.php';
use \Fleet\Utils as Utils;

// needed when installed into subdirectory
// check https://github.com/chriso/klein.php/wiki/Sub-Directory-Installation
$base  = dirname($_SERVER['PHP_SELF']);
if(ltrim($base, '/')){
    $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($base));
}

$klein = new \Klein\Klein();
$config = \Fleet\Config::getInstance();
$db = \Fleet\DB::getInstance();
$template = \Fleet\Template::getInstance();
$klein->config = $config;
$klein->db = $db;
$klein->template = $template;

// route for /
$klein->respond('GET', '/', function ($request, $response, $service, $app) use ($klein) {
  echo $klein->template->render('default.twig', (array) $klein->config);
});

foreach (glob("application/controllers/*.php") as $filename)
{
    include $filename;
}

$klein->dispatch();
