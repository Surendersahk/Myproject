// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form handler
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get values
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const roleInput = document.querySelector('input[name="role"]:checked');

  // Basic validation
  if (!roleInput) {
    alert("Please select a role.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  // --- Password breach check disabled for hackathon ---
  // const breached = await isPasswordBreached(password);
  // if (breached) {
  //   alert("This password has been found in a data breach. Please choose a different password.");
  //   return;
  // }

  // Register user with Firebase Auth
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      role: roleInput.value,
      email: email,
      createdAt: new Date()
    });

    alert("Registered Successfully!");
    // Redirect to homepage or login
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
});
