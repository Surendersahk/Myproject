// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration (replace with your own)
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

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const role = document.querySelector('input[name="role"]:checked')?.value;

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
        // Register user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: email,
          username: username,
          role: role,
          createdAt: new Date().toISOString()
        });
        const userDoc = await getDoc(doc(db, "users", user.uid));
window.location.href = role === "victim" ? "victim.html" : "volunteer.html";

        alert("✅ Registered Successfully!");

        // Redirect happens inside onAuthStateChanged
      } catch (error) {
        console.error("❌ Firebase Error:", error);
        alert(error.message);
      }
    });
  }

  // 🔑 Check login state & redirect automatically
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;

        if (role === "victim") {
          window.location.href = "victim.html";
        } else if (role === "volunteer") {
          window.location.href = "volunteer.html";
        }
      }
    }
  });
});
