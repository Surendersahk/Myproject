import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = { /* same config */ };
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
