import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, X } from "lucide-react";

const STORAGE_KEY = "voltex_testimonials";

const emptyForm = {
  name: "",
  role: "",
  review: "",
  rating: 5,
  status: "Active",
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
  }, [testimonials]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      review: item.review,
      rating: item.rating,
      status: item.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.review.trim()) {
      alert("Please enter customer name and review.");
      return;
    }

    if (editingId) {
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...form, id: editingId } : item
        )
      );
      alert("Testimonial updated successfully!");
    } else {
      setTestimonials((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
      alert("Testimonial added successfully!");
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deleteTestimonial = (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStatus = (id) => {
    setTestimonials((prev) =>
      prev.map((item) =>
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer feedback and reviews.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <h2 className="mt-2 text-3xl font-bold">{testimonials.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Active Reviews</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {testimonials.filter((item) => item.status === "Active").length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Inactive Reviews</p>
          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {testimonials.filter((item) => item.status === "Inactive").length}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Review</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  No testimonials added yet.
                </td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </td>

                  <td className="max-w-xs p-4 text-gray-600">
                    {item.review}
                  </td>

                  <td className="p-4">
                    <span className="flex items-center gap-1 text-orange-500">
                      <Star size={15} fill="currentColor" />
                      {item.rating}/5
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-700"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => deleteTestimonial(item.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>

              <button onClick={() => setShowModal(false)}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-700"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Role
                </label>
                <input
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-700"
                  placeholder="Example: Business Owner"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Review *
                </label>
                <textarea
                  value={form.review}
                  onChange={(e) =>
                    setForm({ ...form, review: e.target.value })
                  }
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-700"
                  rows="4"
                  placeholder="Enter customer feedback"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border p-3"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Stars
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border px-5 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-900 px-5 py-2 font-semibold text-white"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}