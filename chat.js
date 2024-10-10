// Firebase config here (reuse the config from auth.js)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Get the current user
auth.onAuthStateChanged(user => {
    if (user) {
        // Fetch user's username
        database.ref('users/' + user.uid).once('value').then(snapshot => {
            const username = snapshot.val().username;

            // Send message
            sendBtn.addEventListener('click', () => {
                const message = messageInput.value;
                if (message.trim()) {
                    const messageRef = database.ref('messages').push();
                    messageRef.set({
                        text: message,
                        user: username,
                        timestamp: Date.now()
                    });
                    messageInput.value = '';
                }
            });

            // Display messages
            database.ref('messages').on('child_added', (snapshot) => {
                const messageData = snapshot.val();
                const messageElement = document.createElement('div');
                messageElement.textContent = `${messageData.user}: ${messageData.text}`;
                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
            });
        });
    } else {
        // Redirect to login if not authenticated
        window.location = 'index.html';
    }
});
