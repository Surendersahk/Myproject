// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration (replace with your own from Firebase Console)
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

// Wait for DOM to load before attaching form handler
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (!registerForm) {
    console.error("❌ Register form not found in HTML.");
    return;
  }

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.querySelector('input[name="role"]:checked')?.value;

    // Basic validations
    if (!email || !password || !confirmPassword || !role) {
      alert("⚠️ Please fill in all fields and select a role.");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("⚠️ Password should be at least 6 characters long.");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        username: username,
        role: role,
        createdAt: new Date().toISOString()
      });

      alert("✅ Registered Successfully!");

      // Redirect based on role
      if (role === "victim") {
        window.location.href = "victim-dashboard.html";
      } else if (role === "volunteer") {
        window.location.href = "volunteer-dashboard.html";
      }

    } catch (error) {
      console.error("❌ Firebase Error:", error);
      alert(error.message);
    }
  });
});
