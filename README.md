**Lumoshive Academy Batch 3**
* Nama: **Rulif Fadria Nirwansyah**
* Project: **Milestone React CRUD**

# Milestone Project – CRUD Product App

**React.js + Axios + Fakestore API**

## Deskripsi Project

Project ini merupakan aplikasi **CRUD (Create, Read, Update, Delete)** untuk mengelola data produk menggunakan **React.js** dan **API dari fakestoreapi.com**.
Aplikasi ini dibuat untuk memenuhi **Milestone Project: Membuat Aplikasi CRUD Menggunakan API dan React.js**.

Aplikasi memungkinkan user untuk:

* Melihat daftar produk
* Menambahkan produk baru
* Mengedit data produk
* Menghapus produk
* Melakukan pencarian produk

---

## Tujuan Project

* Memahami penggunaan **API** pada React
* Mengimplementasikan **Axios** untuk HTTP request
* Menerapkan **Container–Presentational Pattern**
* Menggunakan **Stateful & Stateless Component**
* Membuat UI yang **responsif dan user-friendly**

---

## Fitur Aplikasi
| Read (Menampilkan produk) 
| Create (Tambah produk)   
| Update (Edit produk)    
| Delete (Hapus produk)   
| Search produk           

---

## Teknologi yang Digunakan

* **React.js**
* **Axios**
* **Tailwind CSS**
* **Fakestore API**
  [https://fakestoreapi.com/products](https://fakestoreapi.com/products)

---

## Arsitektur Aplikasi

Project ini menggunakan **Container–Presentational Pattern**:

### Container Component (Stateful)

* `ProductContainer.jsx`
  bertugas untuk:

  * Mengelola state
  * Fetch data dari API
  * Logic CRUD
  * Kontrol modal dan pencarian

### Presentational Components (Stateless)

* `ProductTable.jsx` → Menampilkan data produk
* `ProductFormModal.jsx` → Form tambah & edit produk
* `ProductViewModal.jsx` → Detail produk

---

## Struktur Folder

```
src/
├── api/
│   └── productApi.js
│
├── containers/
│   └── ProductContainer.jsx
│
├── components/
│   ├── ProductTable.jsx
│   ├── ProductFormModal.jsx
│   └── ProductViewModal.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Alur CRUD

1. **Read**
   Menampilkan daftar produk dari Fakestore API menggunakan Axios.

2. **Create**
   Menambahkan produk baru melalui form input.

3. **Update**
   Mengedit produk yang sudah ada melalui form.

4. **Delete**
   Menghapus produk dari daftar.

> Fakestore API bersifat **fake API**, sehingga perubahan data tidak tersimpan permanen dan dikelola melalui state lokal React.
