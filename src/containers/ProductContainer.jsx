import { useEffect, useState } from "react"; // hook react

// fungsi API (axios)
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

// komponen UI (presentational)
import ProductTable from "../components/ProductTable";
import ProductFormModal from "../components/ProductFormModal";
import ProductViewModal from "../components/ProductViewModal";

export default function ProductContainer() {
  // simpan semua product
  const [products, setProducts] = useState([]);

  // simpan input search
  const [search, setSearch] = useState("");

  // kontrol modal form (add / edit)
  const [formOpen, setFormOpen] = useState(false);

  // kontrol modal view
  const [viewOpen, setViewOpen] = useState(false);

  // product yang sedang dipilih
  const [selected, setSelected] = useState(null);

  // ambil data product saat pertama render
  useEffect(() => {
    const load = async () => {
      const res = await getProducts(); // fetch ke API
      setProducts(res.data);           // simpan ke state
    };

    load();
  }, []);

  // tambah product baru
  const handleCreate = async (data) => {
    const res = await addProduct(data); // kirim ke API

    // karena fakestore API fake, update manual di state
    setProducts((prev) => [
      { ...res.data, id: Date.now() }, // id sementara
      ...prev,
    ]);

    setFormOpen(false); // tutup modal
  };

  // update product
  const handleUpdate = async (data) => {
    await updateProduct(selected.id, data); // update ke API

    // update data di state
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? { ...p, ...data } // data diganti
          : p
      )
    );

    setSelected(null);
    setFormOpen(false);
  };

  // hapus product
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await deleteProduct(id); // hapus di API

    // hapus di state
    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // filter product berdasarkan search (title + category)
  const filteredProducts = products.filter((p) => {
    const text = `${p.title} ${p.category}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CRUD Product</h1>

        <button
          onClick={() => {
            setSelected(null); // mode add
            setFormOpen(true); // buka modal
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Product
        </button>
      </div>

      {/* input search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari Product?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border px-3 py-2 rounded"
        />
      </div>

      {/* tabel product */}
      <ProductTable
        products={filteredProducts}
        onView={(p) => {
          setSelected(p);
          setViewOpen(true);
        }}
        onEdit={(p) => {
          setSelected(p);
          setFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* modal form */}
      {formOpen && (
        <ProductFormModal
          selected={selected}
          onClose={() => {
            setSelected(null);
            setFormOpen(false);
          }}
          onSubmit={(data) =>
            selected
              ? handleUpdate(data) // edit
              : handleCreate(data) // add
          }
        />
      )}

      {/* modal view */}
      {viewOpen && selected && (
        <ProductViewModal
          product={selected}
          onClose={() => {
            setSelected(null);
            setViewOpen(false);
          }}
        />
      )}
    </div>
  );
}
