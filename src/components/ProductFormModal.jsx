// Import hook React untuk state dan lifecycle
import { useEffect, useState } from "react";

// Data kategori (hardcode)
// Dipakai untuk dropdown select kategori
const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

// Komponen modal form product
// Props:
// - selected : data produk yang dipilih (untuk edit)
// - onClose  : fungsi untuk menutup modal
// - onSubmit : fungsi saat form disimpan
export default function ProductFormModal({ selected, onClose, onSubmit }) {
  
  // State untuk menyimpan data form
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  // useEffect ini jalan setiap kali `selected` berubah
  // dan Biasanya dipakai saat mode EDIT
  useEffect(() => {
    if (selected) {
      // Isi form dengan data product yang dipilih
      setForm({
        title: selected.title || "",
        price: selected.price || "",
        category: selected.category || "",
        image: selected.image || "",
        description: selected.description || "",
      });
    }
  }, [selected]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state form sesuai nama input
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi saat form di-submit
  const handleSubmit = (e) => {
    e.preventDefault(); // menambahkan pencegahan reload halaman

    // Validasi sederhana
    if (!form.title || !form.price || !form.category) {
      alert("Title, Price, dan Category wajib diisi!");
      return;
    }

    // Kirim data ke parent component
    onSubmit({
      ...form,
      price: Number(form.price), // pastikan price bertipe number
    });
  };

  return (
    // Background modal (overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      {/* Box modal */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        
        {/* Judul modal (Add / Edit) */}
        <h2 className="text-xl font-bold mb-4">
          {selected ? "Edit Product" : "Add Product"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* INPUT TITLE */}
          <input
            type="text"
            name="title"               // key yang dipakai di state
            placeholder="Title"
            value={form.title}         // ambil dari state
            onChange={handleChange}    // update state
            className="w-full border px-3 py-2 rounded"
            required
          />

          {/* INPUT PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            min="0"
            step="0.01"
          />

          {/* SELECT CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Pilih Kategori Produk --</option>

            {/* Looping kategori */}
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* input img berupa url */}
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Textarea deskription */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />

          {/* BUTTON ACTION */}
          <div className="flex justify-end gap-3 pt-4">
            
            {/* BUTTON CANCEL */}
            <button
              type="button"      // penting: biar ga submit form
              onClick={onClose}  // tutup modal
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            {/* BUTTON SAVE */}
            <button
              type="submit"      // trigger handleSubmit
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
