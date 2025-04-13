document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const voiceButton = document.getElementById('voiceButton');
    const voiceStatus = document.getElementById('voiceStatus');
    const messagesContainer = document.getElementById('messages');
    const newChatBtn = document.getElementById('newChatBtn');
    const chatHistoryList = document.getElementById('chatHistoryList');
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const confirmActionBtn = document.getElementById('confirmAction');
    const deleteHistoryBtn = document.getElementById('deleteHistoryBtn');
    
    // State variables
    let currentChatId = Date.now().toString();
    let chats = JSON.parse(localStorage.getItem('kirbotChats')) || {};
    let recognition = null;
    
    // Initialize the chat interface
    function initChat() {
        initVoiceRecognition();
        loadChatHistory();
        
        if (chats[currentChatId]) {
            loadChat(currentChatId);
        } else {
            createNewChat();
        }
    }
    
    // Create a new chat
    function createNewChat() {
        currentChatId = Date.now().toString();
        chats[currentChatId] = {
            id: currentChatId,
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        saveChats();
        loadChat(currentChatId);
        loadChatHistory();
        messageInput.focus();
    }
    
    // Save chats to localStorage
    function saveChats() {
        localStorage.setItem('kirbotChats', JSON.stringify(chats));
    }
    
    // Load chat history sidebar
    function loadChatHistory() {
        chatHistoryList.innerHTML = '';
        
        const sortedChats = Object.values(chats).sort((a, b) => 
            new Date(b.updatedAt) - new Date(a.updatedAt));
        
        sortedChats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = `history-item ${chat.id === currentChatId ? 'active' : ''}`;
            chatItem.dataset.chatId = chat.id;
            chatItem.innerHTML = `
                <span class="history-title">${chat.title}</span>
                <span class="history-time">${formatTime(chat.updatedAt)}</span>
            `;
            
            chatItem.addEventListener('click', () => {
                loadChat(chat.id);
            });
            
            chatHistoryList.appendChild(chatItem);
        });
    }
    
    // Load a specific chat
    function loadChat(chatId) {
        currentChatId = chatId;
        const chat = chats[chatId];
        
        messagesContainer.innerHTML = '';
        
        if (chat.messages.length === 0) {
            showWelcomeMessage();
        } else {
            chat.messages.forEach(msg => {
                addMessage(msg.sender, msg.text, false);
            });
        }
        
        // Update active state in history list
        document.querySelectorAll('.history-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.history-item[data-chat-id="${chatId}"]`)?.classList.add('active');
    }
    
    // Show welcome message
    function showWelcomeMessage() {
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-content">
                    <img src="/assets/images/kirbot-logo-large.png" alt="Kirbot" class="welcome-logo mb-3">
                    <h1>How can I help you today?</h1>
                </div>
            </div>
        `;
    }
    
    // Add a message to the chat
    function addMessage(sender, text, saveToHistory = true) {
        // Remove welcome message if present
        if (messagesContainer.querySelector('.welcome-message')) {
            messagesContainer.innerHTML = '';
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        if (saveToHistory) {
            const chat = chats[currentChatId];
            chat.messages.push({ sender, text });
            chat.updatedAt = new Date().toISOString();
            
            // Update chat title if it's the first message
            if (chat.messages.length === 1 && sender === 'user') {
                chat.title = text.length > 30 ? text.substring(0, 30) + '...' : text;
            }
            
            saveChats();
            loadChatHistory();
        }
    }
    
    // Format time for display
    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Send message to server
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage('user', message);
            messageInput.value = '';
            
            // Simulate bot response (replace with actual API call)
            setTimeout(() => {
                const responses = [
                    "I'm Kirbot, your AI assistant. How can I help you further?",
                    "That's an interesting point. What else would you like to know?",
                    "I've noted your message. Is there anything specific you need help with?",
                    "Thanks for your message! How can I assist you today?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage('bot', randomResponse);
            }, 800);
        }
    }
    
    // Initialize voice recognition
    function initVoiceRecognition() {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onstart = function() {
                voiceStatus.style.display = 'block';
                voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            };
            
            recognition.onend = function() {
                voiceStatus.style.display = 'none';
                voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                messageInput.value = transcript;
                sendMessage();
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                voiceStatus.style.display = 'none';
                voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
                addMessage('bot', "Sorry, I couldn't understand your voice command.");
            };
        } catch (e) {
            console.error('Speech recognition not supported', e);
            voiceButton.style.display = 'none';
        }
    }
    
    // Delete all chat history
    function deleteAllChats() {
        chats = {}; // Clear the chats object
        localStorage.removeItem('kirbotChats'); // Remove from localStorage
        createNewChat(); // Start a fresh chat
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    newChatBtn.addEventListener('click', createNewChat);
    
    voiceButton.addEventListener('click', function() {
        if (recognition && voiceStatus.style.display !== 'block') {
            recognition.start();
        }
    });
    
    // Delete history button functionality
    deleteHistoryBtn.addEventListener('click', function() {
        document.getElementById('modalBody').textContent = 'Are you sure you want to delete all chat history?';
        document.getElementById('confirmAction').onclick = function() {
            deleteAllChats();
            confirmModal.hide();
        };
        confirmModal.show();
    });
    
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Initialize the chat
    initChat();
});