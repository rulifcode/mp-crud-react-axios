// Komponen ProductFormModal — dipakai untuk Add dan Edit produk
// Mode ditentukan dari props: jika `selected` ada → Edit, jika null → Add
//
// Props:
// - selected : objek produk yang dipilih saat mode Edit (null saat mode Add)
// - onClose  : callback untuk menutup modal
// - onSubmit : callback saat form berhasil disubmit, menerima data form

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Data kategori — hardcode sesuai FakeStore API
// Dipakai untuk opsi dropdown select
const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

// Nilai awal form — dipakai saat mode Add dan saat reset
const INITIAL_FORM = {
  title: "",
  price: "",
  category: "",
  image: "",
  description: "",
};

export default function ProductFormModal({ selected, onClose, onSubmit }) {

  // State form — satu objek untuk semua field
  const [form, setForm] = useState(INITIAL_FORM);

  // State error — menyimpan pesan validasi per field
  // Lebih baik dari alert() karena tidak memblokir UI
  const [errors, setErrors] = useState({});

  // Saat selected berubah:
  // - Jika mode Edit → isi form dengan data produk yang dipilih
  // - Jika mode Add (selected null) → reset form ke nilai awal
  useEffect(() => {
    if (selected) {
      setForm({
        title: selected.title || "",
        price: selected.price || "",
        category: selected.category || "",
        image: selected.image || "",
        description: selected.description || "",
      });
    } else {
      setForm(INITIAL_FORM); // reset form saat mode Add
    }
    setErrors({}); // bersihkan error setiap kali modal dibuka
  }, [selected]);

  // Tutup modal saat user menekan Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handler perubahan input dan select/textarea
  // Pakai computed property [name] agar satu fungsi bisa handle semua field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Hapus error field yang sedang diubah — feedback langsung ke user
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validasi form — kembalikan objek error per field
  // Dipisah dari handleSubmit agar mudah dites dan dimodifikasi
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim())    newErrors.title    = "Title wajib diisi";
    if (!form.price)           newErrors.price    = "Price wajib diisi";
    if (Number(form.price) < 0) newErrors.price   = "Price tidak boleh negatif";
    if (!form.category)        newErrors.category = "Category wajib dipilih";
    return newErrors;
  };

  // Handler submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // cegah reload halaman

    // Jalankan validasi — jika ada error, tampilkan dan batalkan submit
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Kirim data ke container — price dikonversi ke Number
    onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    // ── Overlay: backdrop gelap, klik di luar modal = tutup ──
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >

      {/* ── Box modal utama ──
          stopPropagation mencegah klik di dalam modal ikut menutup modal */}
      <div
        className="w-full max-w-xl bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header modal: judul + tombol X ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          {/* Judul berubah dinamis sesuai mode */}
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            {selected ? "Edit Product" : "Add Product"}
          </h2>
          {/* Tombol close — konsisten dengan ProductViewModal */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body modal: form input ── */}
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5 space-y-4">

            {/* ── INPUT TITLE ── */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Product title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition
                  ${errors.title
                    ? "border-red-300 focus:ring-red-300"       // border merah jika error
                    : "border-gray-200 focus:ring-gray-400"     // normal
                  }`}
              />
              {/* Pesan error inline — muncul jika validasi gagal */}
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* ── INPUT PRICE ── */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition
                  ${errors.price
                    ? "border-red-300 focus:ring-red-300"
                    : "border-gray-200 focus:ring-gray-400"
                  }`}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price}</p>
              )}
            </div>

            {/* ── SELECT CATEGORY ── */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition bg-white
                  ${errors.category
                    ? "border-red-300 focus:ring-red-300"
                    : "border-gray-200 focus:ring-gray-400"
                  }`}
              >
                <option value="">— Pilih kategori —</option>
                {/* Loop dari array CATEGORIES di atas */}
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500">{errors.category}</p>
              )}
            </div>

            {/* ── INPUT IMAGE URL — opsional, tidak divalidasi ── */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
              />
            </div>

            {/* ── TEXTAREA DESCRIPTION — opsional ── */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Product description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 transition resize-none"
              />
            </div>

          </div>

          {/* ── Footer modal: tombol Cancel + Save ── */}
          <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">

            {/* TOMBOL CANCEL
                type="button" penting — mencegah trigger submit form */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            {/* TOMBOL SAVE — konsisten dengan tombol Add Product di ProductTable */}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
            >
              {selected ? "Save Changes" : "Add Product"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}