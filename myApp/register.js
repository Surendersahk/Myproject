// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyB6ehp-gPeTAkET4b5SmjOX24l50KIDGwE",
  authDomain: "helpnet-f5848.firebaseapp.com",
  projectId: "helpnet-f5848",
  storageBucket: "helpnet-f5848.firebasestorage.app",
  messagingSenderId: "340231424827",
  appId: "1:340231424827:web:83c9e84ee23e950cbe851e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get form reference - THIS WAS MISSING
const registerForm = document.getElementById("registerForm");

// Form handler
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop page refresh
  
  const email = document.getElementById("email").value.trim().toLowerCase();
  
  // Enhanced email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  
  // Check for empty email
  if (!email || email.length === 0) {
    alert("Email is required.");
    return;
  }
  
  console.log("Email being sent to Firebase:", email); // Debug log
  console.log("Email length:", email.length);
  console.log("Email character codes:", [...email].map(char => char.charCodeAt(0))); // Check for hidden chars
  
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  
  // Get selected role
  const role = document.querySelector('input[name="role"]:checked')?.value;
  
  if (!role) {
    alert("Please select a role (Victim or Volunteer).");
    return;
  }
  
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  
  // Basic password validation
  if (password.length < 6) {
    alert("Password should be at least 6 characters long.");
    return;
  }
  
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("User registered:", user);
    
    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
      uid: user.uid
    });
    
    alert("✅ Registered Successfully!");
    window.location.href = "login.html"; // redirect to login page
    
  } catch (error) {
    console.error("Error:", error);
    
    // Handle specific Firebase error codes
    let errorMessage = "Registration failed. Please try again.";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "This email is already registered. Please use a different email or try logging in.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password is too weak. Please use a stronger password.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address format.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email registration is not enabled. Please contact support.";
        break;
      default:
        errorMessage = error.message;
    }
    
    alert(errorMessage);
  }
});