if (localStorage.getItem('currentRole') !== 'admin') {
    alert('Akses ditolak! Anda bukan admin.');
    window.location.href = 'login.html';
}

let produkList = JSON.parse(localStorage.getItem('produkList')) || [
    { id: 1, nama: "Laptop RPL Pro", tags: ["Elektronik"], harga: 7500000, gambar: "" },
    { id: 2, nama: "Mouse Wireless", tags: ["Aksesoris"], harga: 150000, gambar: "" }
];

let tagList = JSON.parse(localStorage.getItem('tagList')) || ["Elektronik", "Aksesoris", "Lainnya"];

const tabelProduk = document.getElementById('tabelProduk');
const formProduk = document.getElementById('formProduk');
const namaInput = document.getElementById('nama');
const hargaInput = document.getElementById('harga');
const gambarInput = document.getElementById('gambar');
const editIndexInput = document.getElementById('editIndex');
const formTitle = document.getElementById('formTitle');
const btnSimpan = document.getElementById('btnSimpan');

const containerTag = document.getElementById('containerTag');
const inputTagBaru = document.getElementById('inputTagBaru');
const kategoriCheckboxes = document.getElementById('kategoriCheckboxes');

function renderTag() {
    kategoriCheckboxes.innerHTML = '';
    if (tagList.length === 0) {
        kategoriCheckboxes.innerHTML = '<span style="font-size: 0.85rem; color: #777;">Belum ada tag. Buat tag di atas.</span>';
    } else {
        tagList.forEach(tag => {
            kategoriCheckboxes.innerHTML += `
                <label style="display: inline-flex; align-items: center; gap: 5px; font-weight: normal; color: #333;">
                    <input type="checkbox" name="tagsProduk" value="${tag}" style="width: auto; margin: 0;"> ${tag}
                </label>
            `;
        });
    }

    containerTag.innerHTML = '';
    tagList.forEach((tag, index) => {
        containerTag.innerHTML += `
            <span style="background: var(--warna-utama); color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                ${tag}
                <span onclick="hapusTag(${index})" style="cursor: pointer; color: #ff6b6b; font-weight: bold; font-size: 1rem;">&times;</span>
            </span>
        `;
    });
    
    localStorage.setItem('tagList', JSON.stringify(tagList));
}

function tambahTag() {
    const tagBaru = inputTagBaru.value.trim();
    if (tagBaru !== "" && !tagList.includes(tagBaru)) {
        tagList.push(tagBaru);
        inputTagBaru.value = '';
        renderTag();
    } else if (tagList.includes(tagBaru)) {
        alert("Tag tersebut sudah ada!");
    }
}

function hapusTag(index) {
    if (confirm(`Yakin ingin menghapus tag "${tagList[index]}"?`)) {
        tagList.splice(index, 1);
        renderTag();
    }
}

function renderTabel() {
    tabelProduk.innerHTML = '';
    produkList.forEach((produk, index) => {
        tabelProduk.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${produk.nama}</td>
                <td>${(produk.tags && produk.tags.length > 0) ? produk.tags.join(', ') : '-'}</td>
                <td>Rp ${produk.harga.toLocaleString('id-ID')}</td>
                <td>
                    <button class="btn-warning" onclick="editProduk(${index})">Edit</button>
                    <button class="btn-danger" onclick="hapusProduk(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
    localStorage.setItem('produkList', JSON.stringify(produkList));
}

formProduk.addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = namaInput.value;
    const harga = Number(hargaInput.value);
    const gambar = gambarInput.value;
    const indexEdit = editIndexInput.value;

    const checkboxTercentang = document.querySelectorAll('input[name="tagsProduk"]:checked');
    const tagsDipilih = Array.from(checkboxTercentang).map(cb => cb.value);

    if (indexEdit === "") {
        produkList.push({ id: Date.now(), nama, tags: tagsDipilih, harga, gambar });
    } else {
        produkList[indexEdit].nama = nama;
        produkList[indexEdit].tags = tagsDipilih;
        produkList[indexEdit].harga = harga;
        produkList[indexEdit].gambar = gambar;
        editIndexInput.value = "";
        formTitle.innerText = "Tambah Produk Baru";
        btnSimpan.innerText = "Simpan Produk";
    }

    namaInput.value = '';
    hargaInput.value = '';
    gambarInput.value = '';
    document.querySelectorAll('input[name="tagsProduk"]').forEach(cb => cb.checked = false);
    renderTabel();
});

function editProduk(index) {
    namaInput.value = produkList[index].nama;
    hargaInput.value = produkList[index].harga;
    gambarInput.value = produkList[index].gambar;
    
    const tagsProdukIni = produkList[index].tags || [];
    document.querySelectorAll('input[name="tagsProduk"]').forEach(cb => {
        cb.checked = tagsProdukIni.includes(cb.value);
    });

    editIndexInput.value = index;
    formTitle.innerText = "Edit Produk";
    btnSimpan.innerText = "Update Produk";
}

function hapusProduk(index) {
    if (confirm('Yakin ingin menghapus produk ini?')) {
        produkList.splice(index, 1);
        renderTabel();
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    window.location.href = 'login.html';
}

renderTag();
renderTabel();