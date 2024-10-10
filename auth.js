// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu24DerHJobOFJ1pFo0VTDKwIeFz1aFwU",
    authDomain: "wesocto-chat.firebaseapp.com",
    projectId: "wesocto-chat",
    storageBucket: "wesocto-chat.appspot.com",
    messagingSenderId: "91369086556",
    appId: "1:91369086556:web:4653ace1ca0b4bf8991099",
    databaseURL: "https://wesocto-chat-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Login button event listener
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('Logged in successfully:', user);
            alert('Logged in successfully!');
            window.location = 'chat.html'; // Redirect to chat page
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed: ' + error.message);
        });
});
