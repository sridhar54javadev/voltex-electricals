import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  ImagePlus,
  Save,
} from "lucide-react";

const STORAGE_KEY = "voltex_products";

const defaultCategories = [
  "Lighting",
  "Wires & Cables",
  "Switches",
  "Fans",
  "Electrical Accessories",
  "Other",
];

const emptyProduct = {
  name: "",
  category: "Lighting",
  price: "",
  description: "",
  image: "",
  status: "Active",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const savedCategories = JSON.parse(
        localStorage.getItem("voltex_categories") || "[]"
      );

      if (Array.isArray(savedProducts)) {
        setProducts(savedProducts);
      }

      if (Array.isArray(savedCategories) && savedCategories.length > 0) {
        setCategories(
          savedCategories.map((category) =>
            typeof category === "string" ? category : category.name
          ).filter(Boolean)
        );
      }
    } catch {
      setProducts([]);
    }
  }, []);

  const saveProducts = (updatedProducts) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProducts)
      );
      setProducts(updatedProducts);
      return true;
    } catch {
      alert("Storage limit reached. Please use a smaller image.");
      return false;
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      ...emptyProduct,
      category: categories[0] || "Other",
    });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setFormData({
      ...emptyProduct,
      ...product,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Please select an image smaller than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((previous) => ({
        ...previous,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter the product name.");
      return;
    }

    const productData = {
      ...formData,
      id: editingId || Date.now(),
      name: formData.name.trim(),
      price: Number(formData.price) || 0,
    };

    let updatedProducts;

    if (editingId) {
      updatedProducts = products.map((product) =>
        product.id === editingId ? productData : product
      );
    } else {
      updatedProducts = [productData, ...products];
    }

    if (saveProducts(updatedProducts)) {
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyProduct);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    saveProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">
            Products Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit and manage your electrical products.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          <Plus size={19} />
          Add Product
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Package className="text-blue-600" size={25} />
          <p className="mt-3 text-sm text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold text-blue-950">
            {products.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Package className="text-green-600" size={25} />
          <p className="mt-3 text-sm text-gray-500">Active Products</p>
          <h2 className="text-2xl font-bold text-blue-950">
            {products.filter((p) => p.status === "Active").length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Package className="text-orange-600" size={25} />
          <p className="mt-3 text-sm text-gray-500">Inactive Products</p>
          <h2 className="text-2xl font-bold text-blue-950">
            {products.filter((p) => p.status === "Inactive").length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                          <Package size={22} />
                        </div>
                      )}

                      <span className="font-semibold text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEditForm(product)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <Package
                      size={40}
                      className="mx-auto mb-3 text-gray-300"
                    />
                    <p className="font-semibold text-gray-600">
                      No products found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Add your first product to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="text-xl font-bold text-blue-950">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your product information below.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Name *
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Example: LED Panel Light"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your product..."
                  className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-orange-400">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="mb-3 h-32 w-32 rounded-lg object-cover"
                    />
                  ) : (
                    <ImagePlus
                      size={35}
                      className="mb-3 text-gray-400"
                    />
                  )}

                  <span className="text-sm font-semibold text-gray-600">
                    Click to upload product image
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
                    JPG, PNG or WEBP · Maximum 1 MB
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t pt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                >
                  <Save size={18} />
                  {editingId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}