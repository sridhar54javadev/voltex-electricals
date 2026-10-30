import { useEffect, useState } from "react";
import { Eye, Trash2, X, Search } from "lucide-react";

const STORAGE_KEY = "voltex_enquiries";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  });

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
  }, [enquiries]);

  const updateStatus = (id, status) => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const deleteEnquiry = (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    setEnquiries((prev) => prev.filter((item) => item.id !== id));
    setSelected(null);
  };

  const filteredEnquiries = enquiries.filter((item) =>
    `${item.name} ${item.email} ${item.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customer Enquiries
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage enquiries submitted through your website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Total Enquiries</p>
          <h2 className="mt-2 text-3xl font-bold">{enquiries.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">New Enquiries</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {enquiries.filter((item) => item.status === "New").length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Contacted</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {enquiries.filter((item) => item.status === "Contacted").length}
          </h2>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="relative mb-5 max-w-md">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-4 outline-none focus:border-blue-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.email}</p>
                    </td>

                    <td className="p-4">{item.phone}</td>

                    <td className="p-4">{item.subject || "General Enquiry"}</td>

                    <td className="p-4">
                      <select
                        value={item.status || "New"}
                        onChange={(e) =>
                          updateStatus(item.id, e.target.value)
                        }
                        className="rounded-lg border p-2 text-xs"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelected(item)}
                          className="rounded-lg bg-blue-50 p-2 text-blue-700"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => deleteEnquiry(item.id)}
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
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Enquiry Details</h2>
              <button onClick={() => setSelected(null)}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Customer Name</p>
                <p className="font-semibold">{selected.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">{selected.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold">{selected.phone}</p>
              </div>

              <div>
                <p className="text-gray-500">Subject</p>
                <p className="font-semibold">
                  {selected.subject || "General Enquiry"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Message</p>
                <p className="rounded-lg bg-gray-50 p-3">
                  {selected.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-lg bg-blue-900 py-3 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}