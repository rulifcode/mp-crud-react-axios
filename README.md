# crud-app-mp

Aplikasi CRUD produk berbasis React + Vite, menggunakan [FakeStore API](https://fakestoreapi.com) sebagai sumber data.

🚀 **Live Demo:** [https://mp-crud-react-axios.vercel.app](https://mp-crud-react-axios.vercel.app)

---

## Tech Stack

- **React 18** — UI library
- **Vite** — build tool & dev server
- **Tailwind CSS** — utility-first styling
- **Heroicons** — icon set (outline style)
- **Sonner** — toast notification
- **Axios** — HTTP client

---

## Struktur Folder

```
src/
├── api/
│   └── productApi.js         # Fungsi fetch ke FakeStore API (get, add, update, delete)
├── assets/
│   └── react.svg
├── components/
│   ├── ProductFormModal.jsx   # Modal form untuk Add & Edit produk
│   ├── ProductTable.jsx       # Tabel produk (presentational component)
│   └── ProductViewModal.jsx   # Modal detail produk
├── containers/
│   └── ProductContainer.jsx  # Container: state UI, orkestrasi hook & komponen
├── hooks/
│   ├── useProductFilter.js   # Hook: filter (search + category + rating) + pagination
│   └── useProducts.js        # Hook: fetch data + CRUD (create, update, delete)
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Arsitektur

Proyek ini menggunakan pola **Container / Presentational**:

```
useProducts          → fetch + CRUD
useProductFilter     → search, filter category & rating, pagination
ProductContainer     → state UI (modal open/close, selected product)
ProductTable         → presentational, hanya terima props & tampilkan UI
```

Semua logic data dan filter dikelola di custom hooks, sehingga container dan komponen tetap ramping.

---

## Fitur

- Menampilkan daftar produk dari FakeStore API
- Search produk berdasarkan nama & kategori
- Filter berdasarkan kategori dan rating
- Pagination 10 item per halaman
- Tambah produk baru (Add)
- Edit produk yang sudah ada
- Hapus produk dengan konfirmasi toast
- Toast notifikasi untuk setiap aksi CRUD

---

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build
```

Dev server berjalan di `http://localhost:5173` secara default.

---

## Custom Hooks

### `useProducts`

Mengelola fetch data dan operasi CRUD.

```js
const { products, handleCreate, handleUpdate, handleDelete } = useProducts();
```

| Return          | Tipe       | Deskripsi                          |
|-----------------|------------|------------------------------------|
| `products`      | `array`    | Semua produk dari API              |
| `handleCreate`  | `function` | Tambah produk baru                 |
| `handleUpdate`  | `function` | Update produk berdasarkan id       |
| `handleDelete`  | `function` | Hapus produk berdasarkan id        |

---

### `useProductFilter`

Mengelola filter dan pagination. Menerima `products` dari `useProducts`.

```js
const {
  paginatedProducts,
  filteredProducts,
  categories,
  search,
  selectedCategory,
  selectedRating,
  currentPage,
  totalPages,
  setSearch,
  setSelectedCategory,
  setSelectedRating,
  goToNextPage,
  goToPrevPage,
} = useProductFilter(products);
```

| Return               | Tipe       | Deskripsi                                  |
|----------------------|------------|--------------------------------------------|
| `paginatedProducts`  | `array`    | Produk di halaman aktif (maks 10 item)     |
| `filteredProducts`   | `array`    | Semua produk hasil filter (sebelum paginate) |
| `categories`         | `array`    | Daftar kategori unik                       |
| `currentPage`        | `number`   | Halaman aktif                              |
| `totalPages`         | `number`   | Total halaman                              |
| `goToNextPage`       | `function` | Ke halaman berikutnya                      |
| `goToPrevPage`       | `function` | Ke halaman sebelumnya                      |

---

## Catatan

FakeStore API bersifat *fake* — operasi POST/PUT/DELETE tidak benar-benar menyimpan data ke server. Perubahan hanya tercermin di state lokal selama sesi berlangsung.
