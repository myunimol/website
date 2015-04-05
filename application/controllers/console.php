<?php

$klein->respond('GET', '/console', function ($request, $response, $service, $app) use ($klein) {
  if(isset($_SESSION['logged']) && $_SESSION['logged']===true)
    echo $klein->template->render('console.twig', (array) $klein->config);
  else
    echo $klein->template->render('console-login.twig', (array) $klein->config);
});

$klein->respond('POST', '/login', function ($request, $response, $service, $app) use ($klein) {
  $pwd = $request->password;
  if(strcmp($pwd, $klein->config->app->pwd) == 0) {
    $_SESSION['logged']=true;
  }
  header("Location: /console");
  die('should have redirected by now');
});

$klein->respond('GET', '/logout', function ($request, $response, $service, $app) use ($klein) {
  session_destroy();
  header("Location: /console");
  die('should have redirected by now');
});
