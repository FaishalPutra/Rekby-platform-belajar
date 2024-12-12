// JavaScript to make navbar transparent on scroll
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mengecek status login
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const navbarLogin = document.getElementById("navbarlogout");
const navbarLogout = document.getElementById("navbarlogin");

// Mengatur tampilan elemen berdasarkan status login
if (isLoggedIn) {
  // Tampilkan elemen untuk pengguna yang sudah login
  navbarLogin.classList.add("hidden");
  navbarLogout.classList.remove("hidden");
} else {
  // Tampilkan elemen untuk pengguna yang belum login
  navbarLogin.classList.remove("hidden");
  navbarLogout.classList.add("hidden");
}

// Data lokasi dengan koordinat
const locations = {
  "sono": { lat: -6.933, lng: 107.771, name: "Sono Creative Space" },
  "batuapi": { lat: -6.930, lng: 107.760, name: "Perpustakaan Batu Api" },
  "fore": { lat: -6.925, lng: 107.768, name: "Fore Coffee" },
  "tole": { lat: -6.928, lng: 107.765, name: "Toleransi Kopi Jatinangor" },
  "pawon": { lat: -6.932, lng: 107.770, name: "Pawon Najwa" },
  "nomar": { lat: -6.934, lng: 107.772, name: "Nomar Kopi Roastery" },
  "bento": { lat: -6.931, lng: 107.774, name: "Bento Kopi Jatinangor" },
  "jumpa": { lat: -6.929, lng: 107.769, name: "Jumpa Asa Coffee-nity" },
  "jco": { lat: -6.925, lng: 107.767, name: "J.Co Donuts & Coffee JATOS" },
};

// Referensi elemen HTML
const mapModal = document.getElementById("mapModal");
const mapContainer = document.getElementById("map");
const closeModal = document.querySelector(".close");

let map; // Variabel untuk menyimpan instance peta Leaflet

// Event listener untuk tombol "Lihat Detail"
document.querySelectorAll(".detail-button").forEach((button) => {
  button.addEventListener("click", () => {
      const locationKey = button.getAttribute("data-location");
      const location = locations[locationKey];

      if (!location) return; // Jika lokasi tidak ditemukan, hentikan

      // Tampilkan modal
      mapModal.style.display = "flex";

      // Hapus instance peta jika sudah ada sebelumnya
      if (map) {
          map.remove();
      }

      // Inisialisasi peta baru
      map = L.map(mapContainer).setView([location.lat, location.lng], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
      }).addTo(map);

      // Tambahkan marker pada lokasi
      L.marker([location.lat, location.lng])
          .addTo(map)
          .bindPopup(`<b>${location.name}</b>`)
          .openPopup();
  });
});

// Event listener untuk tombol close modal
closeModal.addEventListener("click", () => {
  // Sembunyikan modal
  mapModal.style.display = "none";

  // Hapus peta saat modal ditutup
  if (map) {
      map.remove();
      map = null; // Reset variabel map
  }
});
