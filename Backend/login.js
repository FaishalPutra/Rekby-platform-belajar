// Konfigurasi Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "./firebaseconfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fungsi Sign Up
async function signUp(email, password, username, phone) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan username ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        phone: phone
      });   

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Fungsi Sign In
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

const signinButton = document.getElementById("signIn_btn");
const signupButton = document.getElementById("signUp_btn");

// button untuk Sign Up
signupButton.addEventListener("click", async () => {
  const email = document.getElementById("email_signUp").value;
  const password = document.getElementById("password_signUp").value;
  const username = document.getElementById("username").value;
  const phone = document.getElementById("phone").value;

  if (!email || !password || !username || !phone) {
    alert("Semua field harus diisi!");
    return;
  }

  try {
    const user = await signUp(email, password, username, phone);
    alert(`Berhasil daftar, selamat datang ${username}`);
    document.getElementById("signUp_form").reset();
    showAuthSection('sign-in');
  } catch (error) {
    alert(`Gagal daftar: ${error.message}`);
  }
});


// button untuk Sign In
signinButton.addEventListener("click", async () => {
  const email = document.getElementById("email_signIn").value;
  const password = document.getElementById("password_signIn").value;

  try {
    const user = await signIn(email, password);
    alert(`Berhasil login, selamat datang ${user.email}`);
    window.location.href = "../../../index.html";
  } catch (error) {
    alert(`Gagal login: ${error.message}`);
  }
});





