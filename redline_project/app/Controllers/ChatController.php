<?php namespace App\Controllers;

class ChatController extends BaseController
{
    public function index()
    {
        return view('chat');
    }

    public function sendMessage()
    {
        $message = $this->request->getPost('message');
        
        // Simple example responses
        $responses = [
            'hello' => "Hi there! How can I help you today?",
            'hi' => "Hello! What can I do for you?",
            'how are you' => "I'm just a bot, but I'm functioning well!",
            'what can you do' => "I can chat with you and remember our conversation history.",
            'bye' => "Goodbye! Feel free to come back anytime.",
            'default' => "I'm not sure how to respond to that. Could you ask me something else?"
        ];
        
        $response = $responses['default'];
        $lowerMessage = strtolower($message);
        
        foreach ($responses as $key => $value) {
            if ($key !== 'default' && strpos($lowerMessage, $key) !== false) {
                $response = $value;
                break;
            }
        }
        
        return $this->response->setJSON(['response' => $response]);
    }
}