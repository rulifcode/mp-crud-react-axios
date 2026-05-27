// Komponen ProductViewModal — Presentational Component
// Menampilkan detail lengkap satu produk dalam bentuk modal overlay.
// Tidak menyimpan state apapun, semua data dan handler dari props.
//
// Props:
// - product  : objek produk yang akan ditampilkan
// - onClose  : callback untuk menutup modal (dari container)

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProductViewModal({ product, onClose }) {

  // Tutup modal saat user menekan tombol Escape
  // Dibersihkan dengan cleanup function agar tidak memory leak
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    // ── Overlay: backdrop gelap, klik di luar modal = tutup ──
    // z-50 memastikan modal tampil di atas semua elemen lain
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose} // klik backdrop → tutup
    >

      {/* ── Box modal utama ──
          stopPropagation mencegah klik di dalam modal
          ikut menutup modal (bubble ke overlay di atas) */}
      <div
        className="bg-white w-full max-w-md rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header modal: judul + tombol close ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Product Detail
          </h2>
          {/* Tombol close — ikon X dari Heroicons */}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body modal ── */}
        <div className="px-5 py-5 space-y-4">

          {/* Thumbnail gambar produk — kotak dengan border tipis */}
          <div className="w-full h-44 flex items-center justify-center border border-gray-100 rounded-md bg-gray-50 p-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain"
              // Fallback saat gambar gagal load — tampilkan placeholder SVG
              onError={(e) => {
                e.currentTarget.onerror = null; // cegah infinite loop
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d1d5db'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18'/%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Nama produk */}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug">
            {product.title}
          </h3>

          {/* Deskripsi produk — teks abu muted */}
          <p className="text-xs text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* ── Info tambahan: category, price, rating ── */}
          <div className="border-t border-gray-100 pt-3 space-y-2">

            {/* Baris category */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Category</span>
              {/* Badge kategori — konsisten dengan ProductTable */}
              <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded capitalize">
                {product.category}
              </span>
            </div>

            {/* Baris price — format 2 desimal */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Price</span>
              <span className="text-sm font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Baris rating — ikon bintang SVG, konsisten dengan ProductTable */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Rating</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
                {/* Ikon bintang SVG — warna amber */}
                <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {/* Optional chaining (?.) — aman jika rating undefined */}
                {product.rating?.rate ?? "—"}
                <span className="text-gray-400">
                  ({product.rating?.count ?? 0} reviews)
                </span>
              </span>
            </div>

          </div>
        </div>

        {/* ── Footer modal: tombol Close ── */}
        <div className="px-5 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}