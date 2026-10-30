import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Wrench,
  Upload,
} from "lucide-react";

const defaultServices = [
  {
    id: 1,
    name: "Electrical Installation",
    description: "Professional electrical installation for homes and businesses.",
    status: "Active",
    image: "",
  },
  {
    id: 2,
    name: "Electrical Maintenance",
    description: "Regular inspection and maintenance of electrical systems.",
    status: "Active",
    image: "",
  },
  {
    id: 3,
    name: "Wiring Solutions",
    description: "Safe and reliable wiring solutions for different properties.",
    status: "Active",
    image: "",
  },
];

export default function Services() {
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem("voltex_services");
      return saved ? JSON.parse(saved) : defaultServices;
    } catch {
      return defaultServices;
    }
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("voltex_services", JSON.stringify(services));
  }, [services]);

  const filteredServices = services.filter((service) =>
    `${service.name} ${service.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      status: "Active",
      image: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service.id);
    setForm({
      name: service.name,
      description: service.description,
      status: service.status,
      image: service.image || "",
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

    if (!form.name.trim()) {
      alert("Please enter a service name.");
      return;
    }

    const duplicate = services.some(
      (service) =>
        service.name.toLowerCase() === form.name.trim().toLowerCase() &&
        service.id !== editingId
    );

    if (duplicate) {
      alert("This service already exists.");
      return;
    }

    if (editingId !== null) {
      setServices((previous) =>
        previous.map((service) =>
          service.id === editingId
            ? { ...service, ...form, name: form.name.trim() }
            : service
        )
      );
    } else {
      setServices((previous) => [
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

  const deleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((previous) =>
        previous.filter((service) => service.id !== id)
      );
    }
  };

  const toggleStatus = (id) => {
    setServices((previous) =>
      previous.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "Active" ? "Inactive" : "Active",
            }
          : service
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Services Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the electrical services offered by your shop.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <Wrench size={25} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Services</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {services.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-gray-100 text-gray-400">
                  <Wrench size={42} />
                </div>
              )}

              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-gray-900">
                    {service.name}
                  </h3>

                  <button
                    onClick={() => toggleStatus(service.id)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      service.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {service.status}
                  </button>
                </div>

                <p className="min-h-12 text-sm leading-6 text-gray-500">
                  {service.description || "No description provided."}
                </p>

                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => openEditModal(service)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteService(service.id)}
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
          No services found.
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId !== null ? "Edit Service" : "Add New Service"}
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
                  Service Name *
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Example: Electrical Installation"
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
                  placeholder="Describe this service..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Service Image
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
                      alt="Service preview"
                      className="h-36 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm({ ...form, image: "" })
                      }
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
                  {editingId !== null ? "Update Service" : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}