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
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";

const TABLE_NAME = "products";
const BUCKET_NAME = "product-images";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Load products and categories
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const [productResult, categoryResult] = await Promise.all([
          supabase
            .from(TABLE_NAME)
            .select("*")
            .order("created_at", { ascending: false }),

          Promise.resolve(
            JSON.parse(localStorage.getItem("voltex_categories") || "[]")
          ),
        ]);

        if (productResult.error) {
          throw productResult.error;
        }

        if (!mounted) return;

        setProducts(productResult.data || []);

        if (Array.isArray(categoryResult) && categoryResult.length > 0) {
          const categoryNames = categoryResult
            .map((category) =>
              typeof category === "string" ? category : category.name
            )
            .filter(Boolean);

          if (categoryNames.length > 0) {
            setCategories(categoryNames);
          }
        }
      } catch (error) {
        console.error("Products loading error:", error);
        toast.error(error.message || "Unable to load products.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // Open Add Product form
  const openAddForm = () => {
    setEditingId(null);
    setSelectedFile(null);

    setFormData({
      ...emptyProduct,
      category: categories[0] || "Other",
    });

    setShowForm(true);
  };

  // Open Edit Product form
  const openEditForm = (product) => {
    setEditingId(product.id);
    setSelectedFile(null);

    setFormData({
      name: product.name || "",
      category: product.category || "Other",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image_url || "",
      status: product.status || "Active",
    });

    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setSelectedFile(null);
    setFormData(emptyProduct);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Please select an image smaller than 1 MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    setFormData((previous) => ({
      ...previous,
      image: URL.createObjectURL(file),
    }));
  };

  // Upload image to Supabase Storage
  const uploadProductImage = async (file) => {
    const fileExtension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const filePath = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Remove old image from Supabase Storage
  const removeOldImage = async (imageUrl) => {
    if (!imageUrl) return;

    const marker = `/${BUCKET_NAME}/`;
    const imagePath = imageUrl.split(marker)[1];

    if (!imagePath) return;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([decodeURIComponent(imagePath)]);

    if (error) {
      console.error("Old image cleanup failed:", error.message);
    }
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!formData.name.trim()) {
      toast.error("Please enter the product name.");
      return;
    }

    if (Number(formData.price) < 0) {
      toast.error("Price cannot be negative.");
      return;
    }

    setSaving(true);

    let uploadedImageUrl = null;

    try {
      let imageUrl = editingId ? formData.image : "";

      if (selectedFile) {
        imageUrl = await uploadProductImage(selectedFile);
        uploadedImageUrl = imageUrl;
      }

      const productData = {
        name: formData.name.trim(),
        category: formData.category || "Other",
        price: Number(formData.price) || 0,
        description: formData.description.trim(),
        image_url: imageUrl || "",
        status: formData.status,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from(TABLE_NAME)
          .update(productData)
          .eq("id", editingId)
          .select()
          .single();
      } else {
        result = await supabase
          .from(TABLE_NAME)
          .insert([productData])
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      if (editingId) {
        const oldProduct = products.find(
          (product) => product.id === editingId
        );

        if (
          selectedFile &&
          oldProduct?.image_url &&
          oldProduct.image_url !== imageUrl
        ) {
          await removeOldImage(oldProduct.image_url);
        }

        setProducts((previous) =>
          previous.map((product) =>
            product.id === editingId ? result.data : product
          )
        );

        toast.success("Product updated successfully!");
      } else {
        setProducts((previous) => [result.data, ...previous]);

        toast.success("Product added successfully!");
      }

      setShowForm(false);
      setEditingId(null);
      setSelectedFile(null);
      setFormData(emptyProduct);
    } catch (error) {
      console.error("Product save error:", error);

      if (uploadedImageUrl) {
        await removeOldImage(uploadedImageUrl);
      }

      toast.error(error.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const product = products.find((item) => item.id === id);

    setDeletingId(id);

    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setProducts((previous) =>
        previous.filter((item) => item.id !== id)
      );

      if (product?.image_url) {
        await removeOldImage(product.image_url);
      }

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Product delete error:", error);
      toast.error(error.message || "Unable to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  // Search products
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
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : (
                <>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
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
                        ₹
                        {Number(product.price || 0).toLocaleString("en-IN")}
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
                            disabled={deletingId === product.id}
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:opacity-50"
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
                </>
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
                onClick={closeForm}
                disabled={saving}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
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
                    step="0.01"
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
                    accept="image/jpeg,image/png,image/webp"
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
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg border px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={18} />

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Product"
                      : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}