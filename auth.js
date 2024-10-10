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

// Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// Switch to register view
showRegister.addEventListener('click', () => {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

// Switch to login view
showLogin.addEventListener('click', () => {
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
});

// Register
registerBtn.addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const username = document.getElementById('register-username').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Save the username in the database under the user's UID
            database.ref('users/' + user.uid).set({
                username: username,
                email: email
            });

            alert('Registered successfully');
            // Redirect to chat.html after successful registration
            window.location = 'chat.html';
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});

// Login
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert('Logged in successfully');
            // Redirect to chat.html after successful login
            window.location = 'chat.html';
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});
