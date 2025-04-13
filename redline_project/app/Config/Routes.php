<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

use App\Controllers\ChatController;

$routes->get('chat', [ChatController::class, 'index']);
$routes->post('sendMessage', [ChatController::class, 'sendMessage']);