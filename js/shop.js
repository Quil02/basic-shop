if (localStorage.getItem('currentRole') !== 'user' && localStorage.getItem('currentRole') !== 'admin') {
    window.location.href = 'login.html';
}

document.getElementById('salamUser').innerText = "Halo, " + (localStorage.getItem('currentUser') || 'User');

let produkList = JSON.parse(localStorage.getItem('produkList')) || [];
let cart = JSON.parse(localStorage.getItem('cartList')) || [];
let tagList = JSON.parse(localStorage.getItem('tagList')) || ["Elektronik", "Aksesoris", "Lainnya"];

const produkContainer = document.getElementById('produkContainer');
const cartCount = document.getElementById('cartCount');
const inputPencarian = document.getElementById('inputPencarian');
const filterKategori = document.getElementById('filterKategori');

function renderFilterTag() {
    filterKategori.innerHTML = '<option value="">Semua Kategori / Tag</option>';
    tagList.forEach(tag => {
        filterKategori.innerHTML += `<option value="${tag}">${tag}</option>`;
    });
}

function renderKatalog(listProduk) {
    produkContainer.innerHTML = '';
    
    if (listProduk.length === 0) {
        produkContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">Tidak ada produk yang ditemukan untuk tag ini.</p>`;
        cartCount.innerText = cart.length;
        return;
    }

    listProduk.forEach((produk) => {
        const indexAsli = produkList.findIndex(p => p.id === produk.id);
        
        let tagBadgesHTML = '';
        const daftarTag = produk.tags || (produk.kategori ? [produk.kategori] : []);
        
        if (daftarTag.length > 0) {
            daftarTag.forEach(tag => {
                tagBadgesHTML += `<span style="font-size: 0.7rem; background: #e2e8f0; padding: 3px 6px; border-radius: 4px; font-weight: bold; color: #4a5568; margin-right: 4px; display: inline-block; margin-bottom: 5px;">#${tag}</span>`;
            });
        } else {
            tagBadgesHTML = `<span style="font-size: 0.7rem; background: #e2e8f0; padding: 3px 6px; border-radius: 4px; font-weight: bold; color: #4a5568; margin-bottom: 5px; display: inline-block;">#Umum</span>`;
        }

        produkContainer.innerHTML += `
            <div class="kartu-produk">
                <img src="${produk.gambar || 'https://via.placeholder.com/150'}" alt="${produk.nama}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
                <div style="text-align: left; margin-bottom: 10px;">${tagBadgesHTML}</div>
                <h3 style="margin-top: 8px;">${produk.nama}</h3>
                <p class="harga">Rp ${produk.harga.toLocaleString('id-ID')}</p>
                <button class="btn-beli" onclick="tambahKeKeranjang(${indexAsli})">Tambah ke Keranjang</button>
            </div>
        `;
    });
    cartCount.innerText = cart.length;
}

function filterProduk() {
    const keyword = inputPencarian.value.toLowerCase();
    const tagPilihan = filterKategori.value;

    const hasilFilter = produkList.filter(produk => {
        const cocokNama = produk.nama.toLowerCase().includes(keyword);
        const daftarTag = produk.tags || (produk.kategori ? [produk.kategori] : []);
        const cocokTag = tagPilihan === "" || daftarTag.includes(tagPilihan);
        
        return cocokNama && cocokTag;
    });

    renderKatalog(hasilFilter);
}

function tambahKeKeranjang(index) {
    cart.push(produkList[index]);
    localStorage.setItem('cartList', JSON.stringify(cart));
    cartCount.innerText = cart.length;
    alert(produkList[index].nama + ' berhasil ditambahkan ke keranjang!');
}

inputPencarian.addEventListener('input', filterProduk);
filterKategori.addEventListener('change', filterProduk);

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    window.location.href = 'login.html';
}

renderFilterTag();
renderKatalog(produkList);