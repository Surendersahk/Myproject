import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = { 
  apiKey: "AIzaSyBXlxzt77Aj4zR-4gAq3K2lf9sGiaEP5t8",
  authDomain: "helpnet-ed918.firebaseapp.com",
  projectId: "helpnet-ed918",
  storageBucket: "helpnet-ed918.firebasestorage.app",
  messagingSenderId: "720997916359",
  appId: "1:720997916359:web:4fe91c39292df781ff68e2" };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Successful ✅");

      // check role selection
      const role = document.querySelector('input[name="role"]:checked').value;
      if (role === "victim") {
        window.location.href = "victim_dashboard.html";
      } else {
        window.location.href = "volunteer_dashboard.html";
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
