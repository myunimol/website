<?php

$klein->respond('GET', '/dashboard', function ($request, $response, $service, $app) use ($klein) {
  if(isset($_SESSION['logged']) && $_SESSION['logged']===true)
    echo $klein->template->render('dashboard.twig', (array) $klein->config);
  else
    echo $klein->template->render('dashboard-login.twig', (array) $klein->config);
});

$klein->respond('POST', '/dashboard/send-notification', function ($request, $response, $service, $app) use ($klein) {
  if(!isset($_SESSION['logged']) || $_SESSION['logged']!=true) {
    http_response_code(401);
    echo "not authorized";
    return;
  }
  $msg = $request->msg;
  $target = $request->target;
  $title = $request->title;
  $hub = new \Azure\NotificationHub($klein->config->app->azure_connection_string, $klein->config->app->azure_hubname);
  $payload = '{"data":{';
  if(isset($msg) && strlen($msg)>10)
    $payload .= '"msg":"'.$msg . '"';
  else {
    http_response_code(400);
    echo "msg was not sent properly: it must be more than 10 chars long";
    return;
  }
  if(isset($title) && strlen($title)>3)
    $payload .= ', "title":"'.$title.'"';
  $payload .= '}}';
  $notifications = array();
  if (isset($target) && strlen($target)>0) {
    switch($target) {
      case 'android': {
        $notifications['android'] = new \Azure\Notification("gcm", $payload);
        break;
      }
      case 'ios': {

        break;
      }
      case 'windowsPhone': {

        break;
      }
      case 'all': {
        $notifications['android'] = new \Azure\Notification("gcm", $payload);
        break;
      }
      default: {
        http_response_code(400);
        echo "target was not sent properly: it must one of 'android', 'ios', 'windowsPhone' or 'all'";
        return;
      }
    }
  } else {
    http_response_code(400);
    echo "target was not sent properly: it must one of 'android', 'ios', 'windowsPhone' or 'all'";
    return;
  }

  $returnMsg = "";
  foreach($notifications as $target=>$notification) {
    try {
      $hub->sendNotification($notification);
      $returnMsg.="notifications to $target were sent successfully\n";
    } catch(\Exception $e) {
      http_response_code(500);
      echo $e->getMessage();
      return;
    }
  }
  http_response_code(200);
  echo $returnMsg;
  return;
});

$klein->respond('POST', '/dashboard/login', function ($request, $response, $service, $app) use ($klein) {
  $pwd = $request->password;
  if(strcmp($pwd, $klein->config->app->pwd) == 0) {
    $_SESSION['logged']=true;
  }
  header("Location: /dashboard");
  die('should have redirected by now');
});

$klein->respond('GET', '/dashboard/logout', function ($request, $response, $service, $app) use ($klein) {
  session_destroy();
  header("Location: /dashboard");
  die('should have redirected by now');
});
