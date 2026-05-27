import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMNS = ["#", "Product", "Category", "Price", "Rating", "Action"];

const RATING_OPTIONS = [
  { label: "All Ratings", value: "" },
  { label: "4★ & up",     value: "4" },
  { label: "3★ & up",     value: "3" },
  { label: "2★ & up",     value: "2" },
];

const StarIcon = () => (
  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function TableHeader({ totalCount, onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
          Products
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">{totalCount} total items</p>
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
      >
        <PlusIcon className="w-3.5 h-3.5" />
        Add Product
      </button>
    </div>
  );
}

function FilterBar({ categories, category, rating, onCategory, onRating }) {
  const selectClass =
    "text-xs text-gray-700 bg-white border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition cursor-pointer";

  return (
    <div className="flex items-center gap-2">
      {/* Dropdown Category — opsi dibangun dari prop categories */}
      <select
        value={category}
        onChange={(e) => onCategory?.(e.target.value)}
        className={selectClass}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="capitalize">
            {cat}
          </option>
        ))}
      </select>

      {/* Dropdown Rating — opsi statis dari konstanta RATING_OPTIONS */}
      <select
        value={rating}
        onChange={(e) => onRating?.(e.target.value)}
        className={selectClass}
      >
        {RATING_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xs">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition"
      />
    </div>
  );
}

function ActionButtons({ product, onView, onEdit, onDelete }) {
  return (
    <div className="flex justify-center items-center gap-1.5">
      <button
        onClick={() => onView?.(product)}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
      >
        <EyeIcon className="w-3.5 h-3.5" />
        View
      </button>
      <button
        onClick={() => onEdit?.(product)}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
      >
        <PencilSquareIcon className="w-3.5 h-3.5" />
        Edit
      </button>
      <button
        onClick={() => onDelete?.(product.id)}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-500 border border-red-100 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors"
      >
        <TrashIcon className="w-3.5 h-3.5" />
        Delete
      </button>
    </div>
  );
}

function ProductRow({ product, index, onView, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-100">
      <td className="px-4 py-3 text-xs text-gray-400 font-medium">{index + 1}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 rounded-md border border-gray-100 bg-gray-50 flex items-center justify-center p-1.5">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug max-w-[220px]">
            {product.title}
          </span>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded capitalize">
          {product.category}
        </span>
      </td>

      <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
        ${product.price.toFixed(2)}
      </td>

      <td className="px-4 py-3 text-center">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
          <StarIcon />
          {product.rating?.rate ?? "—"}
        </span>
      </td>

      <td className="px-4 py-3">
        <ActionButtons
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

// TableFooter — info jumlah produk yang ditampilkan vs total hasil filter
function TableFooter({ visibleCount, totalCount, search }) {
  return (
    <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
      <p className="text-xs text-gray-400">
        Showing {visibleCount} of {totalCount} products
      </p>
      <p className="text-xs text-gray-400">
        {search ? `Filtered by "${search}"` : "All products"}
      </p>
    </div>
  );
}

// PaginationBar — navigasi prev/next di bawah tabel
// - currentPage : halaman aktif
// - totalPages  : total halaman
// - onPrev      : callback tombol Previous
// - onNext      : callback tombol Next
function PaginationBar({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Tombol Previous — disabled di halaman pertama */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon className="w-3.5 h-3.5" />
        Prev
      </button>

      {/* Info halaman aktif */}
      <p className="text-xs text-gray-400">
        Page {currentPage} of {totalPages}
      </p>

      {/* Tombol Next — disabled di halaman terakhir */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRightIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductTable({
  products = [],
  totalCount = 0,
  categories = [],
  search = "",
  selectedCategory = "",
  selectedRating = "",
  currentPage = 1,
  totalPages = 1,
  onSearch,
  onCategory,
  onRating,
  onPrev,
  onNext,
  onAdd,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full space-y-4">
      <TableHeader totalCount={totalCount} onAdd={onAdd} />

      {/* Toolbar: filter di kiri, search di kanan */}
      <div className="flex items-center justify-between gap-3">
        <FilterBar
          categories={categories}
          category={selectedCategory}
          rating={selectedRating}
          onCategory={onCategory}
          onRating={onRating}
        />
        <SearchBar value={search} onChange={onSearch} />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, i) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  index={i}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>

        {/* Footer — hanya muncul jika ada produk */}
        {products.length > 0 && (
          <TableFooter
            visibleCount={products.length}
            totalCount={totalCount}
            search={search}
          />
        )}
      </div>

      {/* Pagination — di bawah tabel, hanya muncul jika lebih dari 1 halaman */}
      {totalPages > 1 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </div>
  );
}