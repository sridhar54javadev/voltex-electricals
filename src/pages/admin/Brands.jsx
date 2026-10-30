import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Award,
  Upload,
} from "lucide-react";

const defaultBrands = [
  {
    id: 1,
    name: "Havells",
    description: "Electrical equipment and consumer products.",
    status: "Active",
    logo: "",
  },
  {
    id: 2,
    name: "Polycab",
    description: "Wires, cables and electrical solutions.",
    status: "Active",
    logo: "",
  },
  {
    id: 3,
    name: "Anchor",
    description: "Switches and electrical accessories.",
    status: "Active",
    logo: "",
  },
  {
    id: 4,
    name: "Philips",
    description: "Lighting and electrical products.",
    status: "Active",
    logo: "",
  },
];

export default function Brands() {
  const [brands, setBrands] = useState(() => {
    try {
      const saved = localStorage.getItem("voltex_brands");
      return saved ? JSON.parse(saved) : defaultBrands;
    } catch {
      return defaultBrands;
    }
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
    logo: "",
  });

  useEffect(() => {
    localStorage.setItem("voltex_brands", JSON.stringify(brands));
  }, [brands]);

  const filteredBrands = brands.filter((brand) =>
    `${brand.name} ${brand.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      status: "Active",
      logo: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (brand) => {
    setEditingId(brand.id);
    setForm({
      name: brand.name,
      description: brand.description || "",
      status: brand.status,
      logo: brand.logo || "",
    });
    setIsModalOpen(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Logo size must be less than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((previous) => ({
        ...previous,
        logo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter a brand name.");
      return;
    }

    const duplicate = brands.some(
      (brand) =>
        brand.name.toLowerCase() === form.name.trim().toLowerCase() &&
        brand.id !== editingId
    );

    if (duplicate) {
      alert("This brand already exists.");
      return;
    }

    if (editingId !== null) {
      setBrands((previous) =>
        previous.map((brand) =>
          brand.id === editingId
            ? { ...brand, ...form, name: form.name.trim() }
            : brand
        )
      );
    } else {
      setBrands((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...form,
          name: form.name.trim(),
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const deleteBrand = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands((previous) =>
        previous.filter((brand) => brand.id !== id)
      );
    }
  };

  const toggleStatus = (id) => {
    setBrands((previous) =>
      previous.map((brand) =>
        brand.id === id
          ? {
              ...brand,
              status: brand.status === "Active" ? "Inactive" : "Active",
            }
          : brand
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Brands Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the brands available in your electrical shop.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus size={18} />
          Add Brand
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <Award size={25} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Brands</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {brands.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Brand Cards */}
      {filteredBrands.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-3">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Award size={35} className="text-gray-400" />
                  )}
                </div>

                <button
                  onClick={() => toggleStatus(brand.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    brand.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {brand.status}
                </button>
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {brand.name}
              </h3>

              <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                {brand.description || "No description provided."}
              </p>

              <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => openEditModal(brand)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => deleteBrand(brand.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-500">
          No brands found.
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId !== null ? "Edit Brand" : "Add New Brand"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Brand Name *
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Example: Havells"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter brand description..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Brand Logo
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-sm text-gray-600 hover:border-blue-700">
                  <Upload size={18} />
                  Choose Logo (Max 1 MB)
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>

                {form.logo && (
                  <div className="mt-3">
                    <img
                      src={form.logo}
                      alt="Brand logo preview"
                      className="h-24 w-32 rounded-lg border border-gray-200 bg-white p-2 object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, logo: "" })}
                      className="mt-2 text-sm font-semibold text-red-600"
                    >
                      Remove Logo
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  {editingId !== null ? "Update Brand" : "Save Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}