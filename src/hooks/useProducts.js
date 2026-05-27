import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api/productApi";

// useProducts — fetch + CRUD
// Tidak mengandung logic filter sama sekali, itu urusan useProductFilter
export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleCreate = async (data) => {
    const res = await addProduct(data);
    setProducts((prev) => [{ ...res.data, id: Date.now() }, ...prev]);
  };

  const handleUpdate = async (id, data) => {
    await updateProduct(id, data);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, handleCreate, handleUpdate, handleDelete };
}