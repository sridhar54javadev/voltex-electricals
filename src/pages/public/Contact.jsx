import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import { siteConfig } from "../../data/siteConfig";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const savedEnquiries = JSON.parse(
      localStorage.getItem("voltex_enquiries") || "[]"
    );

    const newEnquiry = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: "New",
    };

    localStorage.setItem(
      "voltex_enquiries",
      JSON.stringify([newEnquiry, ...savedEnquiries])
    );

    toast.success("Your enquiry has been submitted!");

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello VOLTEX ELECTRICALS, I would like to know more about your products and services."
    );

    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-950 px-6 py-20 text-center text-white">
        <p className="mb-3 font-semibold uppercase tracking-widest text-orange-400">
          Get In Touch
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-300">
          Have questions about electrical products or services?
          Our team is ready to help you.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3">
        {[
          {
            icon: MapPin,
            title: "Our Location",
            detail: siteConfig.contact.address,
          },
          {
            icon: Phone,
            title: "Call Us",
            detail: siteConfig.contact.phone,
          },
          {
            icon: Mail,
            title: "Email Us",
            detail: siteConfig.contact.email,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-200 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <item.icon size={27} />
            </div>

            <h3 className="text-xl font-bold text-blue-950">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-600">
              {item.detail}
            </p>
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              Send Us A Message
            </p>

            <h2 className="mt-3 text-3xl font-bold text-blue-950 md:text-4xl">
              Let's Discuss Your Requirements
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Looking for electrical products, installation support,
              or maintenance services? Send us your enquiry.
              We will be happy to assist you.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <Clock className="text-orange-500" />
                <div>
                  <h4 className="font-semibold text-blue-950">
                    Business Hours
                  </h4>
                  <p className="text-sm text-gray-600">
                    Monday – Saturday | 9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              <button
                onClick={openWhatsApp}
                className="flex items-center gap-3 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Enquiry Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-md"
          >
            <h3 className="mb-6 text-2xl font-bold text-blue-950">
              Send an Enquiry
            </h3>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your enquiry about?"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600"
              >
                <Send size={18} />
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}