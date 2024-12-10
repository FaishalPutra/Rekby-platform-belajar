function showAuthSection(sectionId) {
    // Ambil semua elemen dengan kelas 'auth-section'
    const sections = document.querySelectorAll('.auth_section');

    // Sembunyikan semua section
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');
}

