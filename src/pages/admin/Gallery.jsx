import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Images,
  Upload,
} from "lucide-react";

const defaultGallery = [
  {
    id: 1,
    title: "Electrical Products",
    description: "Our electrical product collection.",
    image: "",
    status: "Active",
  },
  {
    id: 2,
    title: "Shop Interior",
    description: "A look inside our electrical showroom.",
    image: "",
    status: "Active",
  },
];

export default function Gallery() {
  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem("voltex_gallery");
      return saved ? JSON.parse(saved) : defaultGallery;
    } catch {
      return defaultGallery;
    }
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    status: "Active",
  });

  useEffect(() => {
    try {
      localStorage.setItem("voltex_gallery", JSON.stringify(gallery));
    } catch {
      alert("Storage limit reached. Please remove some images and try again.");
    }
  }, [gallery]);

  const filteredGallery = gallery.filter((item) =>
    `${item.title} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      image: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description || "",
      image: item.image || "",
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Image size must be less than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((previous) => ({
        ...previous,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter an image title.");
      return;
    }

    if (!form.image) {
      alert("Please upload an image.");
      return;
    }

    if (editingId !== null) {
      setGallery((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, ...form, title: form.title.trim() }
            : item
        )
      );
    } else {
      setGallery((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...form,
          title: form.title.trim(),
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const deleteImage = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setGallery((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  const toggleStatus = (id) => {
    setGallery((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gallery Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your shop, product and project photographs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <Images size={25} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Gallery Images</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {gallery.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full bg-gray-100 object-cover"
              />

              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

                <p className="min-h-10 text-sm text-gray-500">
                  {item.description || "No description provided."}
                </p>

                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteImage(item.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-500">
          No gallery images found.
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId !== null ? "Edit Gallery Image" : "Add Gallery Image"}
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
                  Image Title *
                </label>

                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Example: Shop Interior"
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
                  placeholder="Describe this image..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Upload Image *
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-sm text-gray-600 hover:border-blue-700">
                  <Upload size={18} />
                  Choose Image (Max 1 MB)

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {form.image && (
                  <div className="mt-3">
                    <img
                      src={form.image}
                      alt="Gallery preview"
                      className="h-40 w-full rounded-lg object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="mt-2 text-sm font-semibold text-red-600"
                    >
                      Remove Image
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
                  {editingId !== null ? "Update Image" : "Save Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}