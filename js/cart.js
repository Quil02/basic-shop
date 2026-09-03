let cart = JSON.parse(localStorage.getItem('cartList')) || [];
const cartTable = document.getElementById('cartTable');
const totalHarga = document.getElementById('totalHarga');

function renderCart() {
    cartTable.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartTable.innerHTML = `<tr><td colspan="4" style="text-align:center;">Keranjang belanja masih kosong.</td></tr>`;
        totalHarga.innerHTML = "Total: Rp 0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.harga;
        cartTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
                <td>
                    <button class="btn-danger" onclick="hapusDariKeranjang(${index})" style="padding: 5px 10px; font-size: 0.85rem;">Hapus</button>
                </td>
            </tr>
        `;
    });

    totalHarga.innerHTML = `
        Total: Rp ${total.toLocaleString('id-ID')}
        <br><br>
        <button onclick="checkout()" style="background-color: var(--warna-sukses); color: white; padding: 10px 20px; font-size: 1rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Checkout / Bayar</button>
    `;
}

// Fitur Menghapus Item dari Keranjang
function hapusDariKeranjang(index) {
    cart.splice(index, 1);
    localStorage.setItem('cartList', JSON.stringify(cart));
    renderCart();
}

// Fitur Simulasi Checkout
function checkout() {
    if (cart.length === 0) return;
    alert('Checkout berhasil! Terima kasih sudah berbelanja di Toko RPL.');
    cart = []; // Kosongkan keranjang
    localStorage.removeItem('cartList');
    renderCart();
}

renderCart();