document.addEventListener("DOMContentLoaded", () => {
    // 1. Buat elemen tombol secara otomatis lewat JS
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "theme-toggle-btn";
    toggleBtn.id = "themeToggle";
    document.body.appendChild(toggleBtn);

    // 2. Fungsi untuk mengubah teks tombol
    const updateBtnText = () => {
        if (document.body.classList.contains("dark-mode")) {
            toggleBtn.innerHTML = "☀️ Light Mode";
        } else {
            toggleBtn.innerHTML = "🌙 Dark Mode";
        }
    };

    // 3. Cek apakah user sebelumnya sudah memilih mode gelap
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateBtnText();

    // 4. Aksi ketika tombol diklik
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        // Simpan preferensi ke localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        updateBtnText();
    });
});