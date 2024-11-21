let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];  // Simpan keranjang di localStorage

// Fungsi untuk menambahkan produk ke keranjang
function tambahKeKeranjang(id, nama, harga) {
    let produk = {
        id: id,
        nama: nama,
        harga: harga,
        jumlah: 1
    };

    let produkExist = keranjang.find(item => item.id === id);
    if (produkExist) {
        produkExist.jumlah++;
    } else {
        keranjang.push(produk);
    }

    localStorage.setItem('keranjang', JSON.stringify(keranjang));
}

// Menampilkan produk yang ada di keranjang
function tampilkanKeranjang() {
    const keranjangTable = document.getElementById("keranjang-table").getElementsByTagName('tbody')[0];
    keranjangTable.innerHTML = '';  // Menghapus konten lama

    let total = 0;

    keranjang.forEach((produk, index) => {
        let row = keranjangTable.insertRow();
        row.innerHTML = `
            <td>${produk.nama}</td>
            <td>
                <button onclick="ubahJumlah(${index}, -1)">-</button>
                ${produk.jumlah}
                <button onclick="ubahJumlah(${index}, 1)">+</button>
            </td>
            <td>Rp ${produk.harga.toLocaleString()}</td>
            <td>Rp ${(produk.harga * produk.jumlah).toLocaleString()}</td>
            <td><button onclick="hapusDariKeranjang(${index})">Hapus</button></td>
        `;
        total += produk.harga * produk.jumlah;
    });

    document.getElementById("total-belanja").textContent = "Rp " + total.toLocaleString();
}

// Fungsi untuk mengubah jumlah produk di keranjang
function ubahJumlah(index, delta) {
    keranjang[index].jumlah += delta;
    if (keranjang[index].jumlah <= 0) {
        keranjang[index].jumlah = 1;
    }
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    tampilkanKeranjang();
}

// Fungsi untuk menghapus produk dari keranjang
function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    tampilkanKeranjang();
}

// Fungsi untuk beralih ke halaman Checkout
function goToCheckout() {
    if (keranjang.length === 0) {
        alert("Kamu tidak perlu membayar apapun, karena keranjangmu masih kosong ");
    } else {
        showCheckout();
    }
}

// Fungsi untuk memproses pembayaran
function prosesPembayaran() {
    if (keranjang.length === 0) {
        alert("Kamu tidak perlu membayar apapun, karena keranjangmu masih kosong ");
    } else {
        alert("YES ! Pembayaran Berhasil. Tunggu Paket mu datang YA ! ");
        keranjang = [];  // Kosongkan keranjang setelah pembayaran berhasil
        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        showProduk();  // Kembali ke halaman produk
    }
}

// Fungsi untuk menampilkan halaman Produk
function showProduk() {
    document.getElementById("produk").style.display = "block";
    document.getElementById("keranjang").style.display = "none";
    document.getElementById("checkout").style.display = "none";
}

// Fungsi untuk menampilkan halaman Keranjang
function showKeranjang() {
    document.getElementById("produk").style.display = "none";
    document.getElementById("keranjang").style.display = "block";
    document.getElementById("checkout").style.display = "none";
    tampilkanKeranjang();
}

// Fungsi untuk menampilkan halaman Checkout
function showCheckout() {
    document.getElementById("produk").style.display = "none";
    document.getElementById("keranjang").style.display = "none";
    document.getElementById("checkout").style.display = "block";
    let total = keranjang.reduce((sum, produk) => sum + produk.harga * produk.jumlah, 0);
    document.getElementById("total-belanja").textContent = "Rp " + total.toLocaleString();
}

// Set default halaman yang tampil
document.addEventListener("DOMContentLoaded", function() {
    showProduk();
});