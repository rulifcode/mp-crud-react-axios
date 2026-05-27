import { useMemo, useState } from "react";

// Jumlah produk yang ditampilkan per halaman
const PAGE_SIZE = 10;

const RATING_OPTIONS = [
  { label: "All Ratings", value: "" },
  { label: "4★ & up",     value: "4" },
  { label: "3★ & up",     value: "3" },
  { label: "2★ & up",     value: "2" },
];

// useProductFilter — filter (search + category + rating) + pagination
// Menerima products mentah dari useProducts, mengembalikan hasil filter + state filter + pagination
export function useProductFilter(products = []) {
  // ─── Filter state ────────────────────────────────────────────────────────────
  const [search, setSearch]                     = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating]     = useState("");

  // ─── Pagination state ────────────────────────────────────────────────────────
  // Selalu reset ke halaman 1 saat filter berubah (lihat useMemo filteredProducts)
  const [currentPage, setCurrentPage] = useState(1);

  // Kategori unik — hanya dihitung ulang kalau products berubah
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // Hasil filter — hanya dihitung ulang kalau products atau salah satu filter berubah
  // Search dilakukan pada title + category sekaligus (case-insensitive)
  const filteredProducts = useMemo(() => {
    // Reset ke halaman 1 setiap kali filter berubah agar tidak stuck di halaman kosong
    setCurrentPage(1);

    return products.filter((p) => {
      const matchSearch   = `${p.title} ${p.category}`.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !selectedCategory || p.category === selectedCategory;
      const matchRating   = !selectedRating || p.rating?.rate >= Number(selectedRating);
      return matchSearch && matchCategory && matchRating;
    });
  }, [products, search, selectedCategory, selectedRating]);

  // ─── Pagination logic ────────────────────────────────────────────────────────

  // Total halaman berdasarkan jumlah produk hasil filter
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  // Slice produk sesuai halaman aktif
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  // Navigasi halaman — dibatasi agar tidak keluar dari range
  const goToPage     = (page) => setCurrentPage(Math.min(Math.max(1, page), totalPages));
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);

  return {
    // Data
    paginatedProducts,   // produk yang ditampilkan di halaman aktif
    filteredProducts,    // semua produk hasil filter (untuk totalCount footer)
    categories,
    RATING_OPTIONS,

    // Filter state + setter
    search,
    selectedCategory,
    selectedRating,
    setSearch,
    setSelectedCategory,
    setSelectedRating,

    // Pagination state + handler
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  };
}