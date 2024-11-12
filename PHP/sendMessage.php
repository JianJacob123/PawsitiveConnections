<?php
    require __DIR__ . '/vendor/autoload.php';

    $options = array(
        'cluster' => 'ap1',
        'useTLS' => true
    );
    $pusher = new Pusher\Pusher(
        '77c53666ec2e4691180c',
        '68749b88168b1951b269',
        '1890873',
        $options
    );

    $data['message'] = 'hello world';
    $pusher->trigger('my-channel', 'my-event', $data);
?>