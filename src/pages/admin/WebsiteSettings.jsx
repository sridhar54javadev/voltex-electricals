import { useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

const STORAGE_KEY = "voltex_website_settings";

const defaultSettings = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  phone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
  whatsapp: siteConfig.contact.whatsapp,
};

export default function WebsiteSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    alert("Website settings saved successfully!");
  };

  const fields = [
    { label: "Business Name", name: "name", type: "text" },
    { label: "Tagline", name: "tagline", type: "text" },
    { label: "Business Email", name: "email", type: "email" },
    { label: "Contact Number", name: "phone", type: "tel" },
    { label: "WhatsApp Number", name: "whatsapp", type: "tel" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-3 text-blue-900">
            <Settings size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Website Settings
            </h1>
            <p className="text-sm text-gray-500">
              Manage your business information.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="max-w-3xl space-y-6 rounded-xl border bg-white p-6"
      >
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Business Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update the information displayed on your website.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                value={settings[field.name]}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Business Address
          </label>

          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            rows="2"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Business Description
          </label>

          <textarea
            name="description"
            value={settings.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700"
          />
        </div>

        <div className="flex justify-end border-t pt-5">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </form>

      <div className="max-w-3xl rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
        <strong>Note:</strong> These settings are currently saved in your
        browser's LocalStorage. We'll connect them to the public website in a
        later step.
      </div>
    </div>
  );
}