// Import icon yang akan dipakai untuk tombol View, Edit, dan Delete
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Komponen ProductTable
// Menerima props:
// - products : data produk (array)
// - onView : fungsi saat tombol View diklik
// - onEdit : fungsi saat tombol Edit diklik
// - onDelete : fungsi saat tombol Delete diklik
export default function ProductTable({ products, onView, onEdit, onDelete }) {
  return (
    // Wrapper tabel agar bisa di-scroll ke samping dan ada border
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      
      {/* Tabel utama */}
      <table className="w-full text-sm">
        
        {/* Header tabel */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">No</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-center">Rating</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        {/* Body tabel */}
        <tbody className="divide-y">
          
          {/* Looping data products */}
          {products.map((p, i) => (
            
            // Setiap baris tabel
            <tr key={p.id} className="hover:bg-gray-50">
              
              {/* Nomor urut */}
              <td className="px-4 py-3">
                {i + 1}
              </td>

              {/* Kolom product (gambar + nama) */}
              <td className="px-4 py-3 flex items-center gap-3">
                
                {/* Gambar produk */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-12 h-12 object-contain"
                />

                {/* Nama produk (dibatasi 2 baris) */}
                <span className="font-medium line-clamp-2">
                  {p.title}
                </span>
              </td>

              {/* Kategori produk */}
              <td className="px-4 py-3 capitalize">
                {p.category}
              </td>

              {/* Harga produk */}
              <td className="px-4 py-3 text-right font-semibold">
                ${p.price}
              </td>

              {/* Rating produk
                  pakai optional chaining (?) supaya aman
                  kalau rating belum ada */}
              <td className="px-4 py-3 text-center">
                ⭐ {p.rating?.rate}
              </td>

              {/* Kolom Action */}
              <td className="px-4 py-3">
                
                {/* Wrapper tombol action */}
                <div className="flex justify-center gap-2">
                  
                  {/* BUTTON VIEW */}
                  <button
                    // Kirim seluruh data produk ke parent
                    onClick={() => onView(p)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View
                  </button>

                  {/* BUTTON EDIT */}
                  <button
                    // Kirim data produk yang mau diedit
                    onClick={() => onEdit(p)}
                    className="flex items-center gap-1 px-3 py-1 text-yellow-600 border border-yellow-200 rounded hover:bg-yellow-50"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                    Edit
                  </button>

                  {/* BUTTON DELETE */}
                  <button
                    // Kirim ID produk untuk dihapus
                    onClick={() => onDelete(p.id)}
                    className="flex items-center gap-1 px-3 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
