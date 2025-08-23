// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBXlxzt77Aj4zR-4gAq3K2lf9sGiaEP5t8",
  authDomain: "helpnet-ed918.firebaseapp.com",
  projectId: "helpnet-ed918",
  storageBucket: "helpnet-ed918.firebasestorage.app",
  messagingSenderId: "720997916359",
  appId: "1:720997916359:web:4fe91c39292df781ff68e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form handler
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop page refresh

  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);

    alert("✅ Registered Successfully!");
    window.location.href = "login.html"; // redirect to login page
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
});