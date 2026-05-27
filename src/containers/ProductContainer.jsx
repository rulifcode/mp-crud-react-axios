import { useState } from "react";
import { toast, Toaster } from "sonner";

import { useProducts } from "../hooks/useProducts";
import { useProductFilter } from "../hooks/useProductFilter";

import ProductTable from "../components/ProductTable";
import ProductFormModal from "../components/ProductFormModal";
import ProductViewModal from "../components/ProductViewModal";

export default function ProductContainer() {
  const { products, handleCreate, handleUpdate, handleDelete } = useProducts();

  const {
    paginatedProducts,   // produk yang ditampilkan di halaman aktif
    filteredProducts,    // semua produk hasil filter (untuk totalCount)
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

  // State UI: kontrol buka/tutup modal form (add / edit)
  const [formOpen, setFormOpen] = useState(false);

  // State UI: kontrol buka/tutup modal view
  const [viewOpen, setViewOpen] = useState(false);

  // Produk yang sedang dipilih — dipakai oleh modal form (edit) dan modal view
  const [selected, setSelected] = useState(null);

  // Handler Delete — pakai toast konfirmasi sebelum benar-benar menghapus
  const onDelete = (id) => {
    const product = products.find((p) => p.id === id);
    const name =
      product?.title?.slice(0, 30) + (product?.title?.length > 30 ? "…" : "");

    toast(`Hapus "${name}"?`, {
      description: "Tindakan ini tidak bisa dibatalkan.",
      duration: 5000,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await handleDelete(id);
            toast.success("Produk berhasil dihapus.");
          } catch {
            toast.error("Gagal menghapus produk. Coba lagi.");
          }
        },
      },
      cancel: { label: "Cancel" },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster
        position="top-center"
        toastOptions={{ classNames: { toast: "font-sans text-sm" } }}
      />

      <ProductTable
        products={paginatedProducts}
        totalCount={filteredProducts.length}
        categories={categories}
        search={search}
        selectedCategory={selectedCategory}
        selectedRating={selectedRating}
        currentPage={currentPage}
        totalPages={totalPages}
        onSearch={setSearch}
        onCategory={setSelectedCategory}
        onRating={setSelectedRating}
        onPrev={goToPrevPage}
        onNext={goToNextPage}
        onAdd={() => {
          setSelected(null);
          setFormOpen(true);
        }}
        onView={(p) => {
          setSelected(p);
          setViewOpen(true);
        }}
        onEdit={(p) => {
          setSelected(p);
          setFormOpen(true);
        }}
        onDelete={onDelete}
      />

      {formOpen && (
        <ProductFormModal
          selected={selected}
          onClose={() => {
            setSelected(null);
            setFormOpen(false);
          }}
          onSubmit={async (data) => {
            try {
              if (selected) {
                await handleUpdate(selected.id, data);
                toast.success("Produk berhasil diperbarui.");
              } else {
                await handleCreate(data);
                toast.success("Produk berhasil ditambahkan.");
              }
              setSelected(null);
              setFormOpen(false);
            } catch {
              toast.error("Terjadi kesalahan. Coba lagi.");
            }
          }}
        />
      )}

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