<?php

$klein->respond('GET', '/dashboard', function ($request, $response, $service, $app) use ($klein) {
  if(isset($_SESSION['logged']) && $_SESSION['logged']===true)
    echo $klein->template->render('dashboard.twig', (array) $klein->config);
  else
    echo $klein->template->render('dashboard-login.twig', (array) $klein->config);
});

$klein->respond('GET', '/send-notification', function ($request, $response, $service, $app) use ($klein) {
  if(!isset($_SESSION['logged']) || $_SESSION['logged']!=true) {
    header("Location: /dashboard");
    die('should have redirected by now');
  }
  try {
    $hub = new \Azure\NotificationHub($klein->config->app->azure_connection_string, $klein->config->app->azure_hubname);
    $message = '{"data":{"msg":"Hello from PHP!"}}';
    $notification = new \Azure\Notification("gcm", $message);
    $hub->sendNotification($notification);
  } catch(\Exception $e) {
    echo $e->getMessage();
  }
});

$klein->respond('POST', '/login', function ($request, $response, $service, $app) use ($klein) {
  $pwd = $request->password;
  if(strcmp($pwd, $klein->config->app->pwd) == 0) {
    $_SESSION['logged']=true;
  }
  header("Location: /dashboard");
  die('should have redirected by now');
});

$klein->respond('GET', '/logout', function ($request, $response, $service, $app) use ($klein) {
  session_destroy();
  header("Location: /dashboard");
  die('should have redirected by now');
});
