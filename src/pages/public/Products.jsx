import { useMemo, useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Zap,
  Lightbulb,
  Cable,
  Plug,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

import { siteConfig } from "../../data/siteConfig";
import { supabase } from "../../lib/supabase";

const TABLE_NAME = "products";
const CATEGORY_KEY = "voltex_categories";

function getStoredCategories() {
  try {
    const saved = localStorage.getItem(CATEGORY_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((category) => {
        if (typeof category === "string") return true;
        return category.status !== "Inactive";
      })
      .map((category) =>
        typeof category === "string" ? category : category.name
      )
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getProductIcon(product) {
  const text = `${product.name} ${product.category}`.toLowerCase();

  if (text.includes("light") || text.includes("bulb")) {
    return Lightbulb;
  }

  if (text.includes("wire") || text.includes("cable")) {
    return Cable;
  }

  if (text.includes("switch") || text.includes("socket")) {
    return Plug;
  }

  return Zap;
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "Contact for Price";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice) || numericPrice === 0) {
    return "Contact for Price";
  }

  return `₹${numericPrice.toLocaleString("en-IN")}`;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Products");
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from Supabase
  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error: fetchError } = await supabase
          .from(TABLE_NAME)
          .select("*")
          .eq("status", "Active")
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (!mounted) return;

        setProducts(data || []);
        setCategories(getStoredCategories());
      } catch (err) {
        console.error("Public products loading error:", err);

        if (mounted) {
          setError(err.message || "Unable to load products.");
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // Get available categories
  const availableCategories = useMemo(() => {
    return [
      ...new Set([
        ...categories,
        ...products.map((product) => product.category),
      ]),
    ].filter(Boolean);
  }, [categories, products]);

  // Search, filter and sort
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (product.name || "").toLowerCase().includes(searchText) ||
        (product.description || "").toLowerCase().includes(searchText) ||
        (product.category || "").toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All Products" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "name-asc") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    if (sortOrder === "name-desc") {
      result.sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    }

    return result;
  }, [products, search, selectedCategory, sortOrder]);

  const whatsappNumber = siteConfig.contact.whatsapp;

  // WhatsApp enquiry
  const handleEnquiry = (productName) => {
    const message =
      `Hello VOLTEX ELECTRICALS, I am interested in ${productName}. Please share more details.`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <p className="font-semibold uppercase tracking-widest text-orange-400">
          Our Product Collection
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
          Explore Our <span className="text-orange-500">Products</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          Discover electrical products designed to meet your residential,
          commercial, and industrial requirements.
        </p>
      </section>

      {/* Product Catalogue */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">

          {/* Search and Sort */}
          <div className="mb-10 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search electrical products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 outline-none transition focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4">
              <SlidersHorizontal
                size={19}
                className="text-orange-500"
              />

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent py-4 text-sm font-medium outline-none"
              >
                <option value="default">Default Sorting</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-4">

            {/* Categories Sidebar */}
            <aside>
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                Categories
              </h2>

              <div className="flex flex-wrap gap-3 lg:flex-col">
                {["All Products", ...availableCategories].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                        selectedCategory === category
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-orange-100"
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Available Products
                </h2>

                <span className="text-sm text-gray-500">
                  {loading ? "Loading..." : `${filteredProducts.length} Products Found`}
                </span>
              </div>

              {/* Loading */}
              {loading ? (
                <div className="rounded-2xl bg-slate-50 px-6 py-20 text-center">
                  <p className="text-gray-500">
                    Loading products...
                  </p>
                </div>
              ) : error ? (
                /* Error */
                <div className="rounded-2xl bg-red-50 px-6 py-20 text-center">
                  <h3 className="text-xl font-bold text-red-700">
                    Unable to Load Products
                  </h3>

                  <p className="mt-2 text-sm text-red-600">
                    {error}
                  </p>
                </div>
              ) : filteredProducts.length > 0 ? (
                /* Products */
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => {
                    const Icon = getProductIcon(product);

                    const productImage = product.image_url || "";

                    return (
                      <div
                        key={product.id}
                        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="flex h-48 items-center justify-center overflow-hidden bg-slate-100 transition group-hover:bg-orange-50">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <Icon
                              size={75}
                              strokeWidth={1.3}
                              className="text-orange-500"
                            />
                          )}
                        </div>

                        <div className="p-6">
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                            {product.category}
                          </span>

                          <h3 className="mt-3 text-lg font-bold text-slate-900">
                            {product.name}
                          </h3>

                          <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                            {product.description}
                          </p>

                          <div className="mt-5 flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-700">
                              {formatPrice(product.price)}
                            </span>

                            <button
                              onClick={() => handleEnquiry(product.name)}
                              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-orange-500"
                            >
                              <MessageCircle size={15} />
                              Enquire
                              <ArrowUpRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="rounded-2xl bg-slate-50 px-6 py-20 text-center">
                  <Search
                    size={45}
                    className="mx-auto text-gray-400"
                  />

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    No Products Found
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Try another search term or select a different category.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("All Products");
                    }}
                    className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-orange-500 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Need Help Finding the Right Product?
        </h2>

        <p className="mt-4 text-orange-50">
          Contact our team for product information and enquiries.
        </p>

        <a
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}