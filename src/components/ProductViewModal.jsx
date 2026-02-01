// Komponen ini digunakan untuk MENAMPILKAN detail produk (VIEW)
// Termasuk Presentational / Stateless Component

const ProductViewModal = ({ product, onClose }) => {

  // product  -> data produk yang dipilih
  // onClose  -> fungsi untuk menutup modal

  return (
    // === Overlay modal ===
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      {/* === Box modal utama === */}
      <div className="bg-white max-w-md p-6 rounded shadow">

        {/* === Gambar produk === */}
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain"
        />

        {/* === Judul produk === */}
        <h2 className="font-bold mt-4">
          {product.title}
        </h2>

        {/* === Deskripsi produk === */}
        <p className="text-sm text-gray-600 mt-2">
          {product.description}
        </p>

        {/* === Informasi tambahan === */}
        <div className="mt-3 text-sm space-y-1">

          {/* Menampilkan kategori produk */}
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          {/* Menampilkan harga produk */}
          <p>
            <strong>Price:</strong> $ {product.price}
          </p>

          {/* 
            Optional chaining (?.)
            Dipakai supaya aplikasi tidak error
            kalau rating tidak ada
          */}
          <p>
            ⭐ {product.rating?.rate} ({product.rating?.count})
          </p>
        </div>

        {/* === Tombol Close === */}
        {/* onClick akan memanggil fungsi dari parentnya */}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-800 text-white px-4 py-1 rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default ProductViewModal;
