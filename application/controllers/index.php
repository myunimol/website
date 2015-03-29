<?php

$klein->respond('POST', '/sendmail', function ($request, $response, $service, $app) use ($klein) {
  $email = $request->email;
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Inserisci una mail valida, perfavore.";
    return;
  }
  $mail = new \Fleet\Mail("mattmezza@gmail.com", "Voglio essere notificato del rilascio di MyUnimol", "$email vorrebbe essere notificato del rilascio di MyUnimol", $email, $email);
  if($mail->send())
    echo "Grazie! Ti avviseremo non appena MyUnimol sarà disponibile.";
  else
    echo "Errore nella richiesta di sottoscrizione.";
});
