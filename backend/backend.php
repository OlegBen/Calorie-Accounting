<?php
    $data = $_POST;

    $data['timestamp'] = time();

    $json = file_get_contents("../db/eater.json");

    $db = json_decode($json);
    array_push($db, $data);

    file_put_contents("../db/eater.json", json_encode($db));
