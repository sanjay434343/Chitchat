// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq1cjF6IaTOUpZ8-xXWfpqLWFWW8tX8sI",
    authDomain: "vokiee-502b1.firebaseapp.com",
    databaseURL: "https://vokiee-502b1-default-rtdb.firebaseio.com",
    projectId: "vokiee-502b1",
    storageBucket: "vokiee-502b1.appspot.com",
    messagingSenderId: "714989736332",
    appId: "1:714989736332:web:3a097ad8bb9fd71d8c06a9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Chat Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Function to display messages in chat
function displayMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${username}: </span>${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

// Function to send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    const username = prompt("Enter your name:") || "Anonymous"; // Get username

    if (message) {
        // Push message to Firebase
        database.ref('messages').push({
            username: username,
            message: message
        });

        messageInput.value = ''; // Clear input
    }
});

// Listen for new messages in Firebase
database.ref('messages').on('child_added', snapshot => {
    const { username, message } = snapshot.val();
    displayMessage(username, message);
});
