// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "YOUR_DATABASE_URL"
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

            // Save the username in the database
            database.ref('users/' + user.uid).set({
                username: username,
                email: email
            });

            alert('Registered successfully');
            // Redirect to chat
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
            // Redirect to chat
            window.location = 'chat.html';
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});
