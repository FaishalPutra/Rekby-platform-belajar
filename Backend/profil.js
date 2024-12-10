// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "./firebaseconfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global Flag for Logout
let isLoggingOut = false;

// DOM Elements
const usernameBox = document.getElementById("username_box");
const emailBox = document.getElementById("email_box");
const phoneBox = document.getElementById("phone_box");
const logoutButton = document.getElementById("logout-button");


onAuthStateChanged(auth, async (user) => {
  if (user && !isLoggingOut) {
    console.log("Pengguna login:", user.email);

    // Ambil UID dan email
    const uid = user.uid;
    const email = user.email;

    emailBox.textContent = email || "Tidak ada email";

    // Ambil username
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        usernameBox.textContent = userData.username || "Tidak ada username";
        phoneBox.textContent = userData.phone || "0";
      } else {
        console.error("Data pengguna tidak ditemukan di Firestore.");
      }
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
    }
  } else if (!user && !isLoggingOut) {
    console.log("Pengguna tidak login.");
    setTimeout(() => {
      if (!auth.currentUser) {
        alert("Anda belum login. Silakan login terlebih dahulu.");
        window.location.href = "../Signin/signin.html";
      }
    }, 1000);
  }
});

// button untuk logout
logoutButton.addEventListener("click", async () => {
  const confirmation = window.confirm("Apakah Anda yakin ingin logout?");
  if (confirmation) {
    try {
      isLoggingOut = true;
      await signOut(auth);
      console.log("Logout berhasil.");
      localStorage.setItem("isLoggedIn", "false");
      alert("Anda telah logout.");
      window.location.href = "../../index.html";
    } catch (error) {
      console.error("Kesalahan saat logout:", error);
      alert("Terjadi kesalahan saat logout.");
      isLoggingOut = false;
    }
  } else {
    console.log("Pengguna membatalkan logout.");
  }
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    // if (user) {
    //     // Jika pengguna sedang login
    //     console.log("User is logged in:");
    //     console.log("User UID:", user.uid);
    //     console.log("User Email:", user.email);
    // } else {
    //     // Jika tidak ada pengguna yang login
    //     console.log("No user is logged in.");
    // }
    // });
});


