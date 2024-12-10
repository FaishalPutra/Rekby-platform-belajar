function goBack() {
    if (document.referrer) {
        // Jika ada halaman sebelumnya dalam browser history
        window.location.href = document.referrer;
    } else {
        // Jika tidak ada halaman sebelumnya, arahkan ke halaman tertentu
        window.location.href = "../../index.html"; // Ganti dengan URL default
    }
}
