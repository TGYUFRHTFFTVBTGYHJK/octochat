// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu24DerHJobOFJ1pFo0VTDKwIeFz1aFwU",
    authDomain: "wesocto-chat.firebaseapp.com",
    databaseURL: "https://wesocto-chat-default-rtdb.firebaseio.com",
    projectId: "wesocto-chat",
    storageBucket: "wesocto-chat.appspot.com",
    messagingSenderId: "91369086556",
    appId: "1:91369086556:web:4653ace1ca0b4bf8991099"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Function to send message
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        const messageRef = database.ref('messages').push();
        messageRef.set({
            text: message,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
});

// Function to display messages
database.ref('messages').on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.textContent = messageData.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
