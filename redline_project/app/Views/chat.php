<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kirbot</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <!-- Sidebar Toggle Button -->
    <button class="sidebar-toggle" id="sidebarToggle">
        <i class="fas fa-bars"></i>
    </button>

    <div class="container-fluid chat-container">
        <div class="row h-100">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 sidebar p-0" id="sidebar">
                <div class="d-flex flex-column h-100">
                    <!-- Header -->
                    <div class="sidebar-header p-3 d-flex align-items-center">
                        <img src="/assets/images/kirbot-logo.png" alt="Kirbot Logo" class="logo me-2">
                        <h1 class="app-name mb-0">Kirbot</h1>
                    </div>
                    
                    <!-- New Chat Button -->
                    <button id="newChatBtn" class="new-chat-btn">
                        <i class="fas fa-plus me-2"></i> New Chat
                    </button>
                    
                    <!-- Chat History -->
                    <div class="chat-history-container">
                        <div class="d-flex justify-content-between align-items-center">
                            <h2 class="section-title">CHAT HISTORY</h2>
                            <button id="deleteHistoryBtn" class="btn btn-sm btn-outline-danger" title="Delete all history">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div id="chatHistoryList" class="history-list">
                            <!-- Chat items will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Main Chat Area -->
            <div class="col-md-9 col-lg-10 main-chat-area p-0">
                <!-- Messages Container -->
                <div class="messages-container" id="messages">
                    <!-- Welcome message appears when no chats exist -->
                    <div class="welcome-message">
                        <div class="welcome-content">
                            <img src="/assets/images/kirbot-logo-large.png" alt="Kirbot" class="welcome-logo mb-3">
                            <h1>How can I help you today?</h1>
                        </div>
                    </div>
                </div>
                
                <!-- Input Area -->
                <div class="input-container">
                    <div class="input-group">
                        <input type="text" id="messageInput" class="form-control" 
                               placeholder="Message Kirbot..." aria-label="Message input">
                        <div class="input-buttons">
                            <button class="btn voice-btn" id="voiceButton" title="Voice Input">
                                <i class="fas fa-microphone"></i>
                            </button>
                            <button class="btn send-btn" id="sendButton">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    <div id="voiceStatus" class="voice-status">
                        <i class="fas fa-circle recording-indicator"></i> Listening...
                    </div>
                    <div class="disclaimer">
                        Kirbot may produce inaccurate information about people, places, or facts.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirmation Modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Action</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalBody">
                    Are you sure you want to delete all chat history?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmAction">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/script.js"></script>
</body>
</html>