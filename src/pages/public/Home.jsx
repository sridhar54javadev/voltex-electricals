import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Zap,
  Lightbulb,
  Cable,
  Plug,
  Settings,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  MoveUpRight,
  CircuitBoard,
  Factory,
  Power,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const categories = [
  {
    number: "01",
    name: "Lighting Solutions",
    subtitle: "Illuminate every possibility.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    icon: Lightbulb,
  },
  {
    number: "02",
    name: "Wires & Cables",
    subtitle: "The connection that matters.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
    icon: Cable,
  },
  {
    number: "03",
    name: "Switches & Sockets",
    subtitle: "Control with confidence.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
    icon: Plug,
  },
  {
    number: "04",
    name: "Electrical Accessories",
    subtitle: "Every detail. Every connection.",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85",
    icon: Settings,
  },
];

const features = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Quality First",
    description:
      "Explore electrical products selected with quality and reliability in mind.",
  },
  {
    icon: Award,
    number: "02",
    title: "Trusted Selection",
    description:
      "Discover products from electrical manufacturers and established brands.",
  },
  {
    icon: Headphones,
    number: "03",
    title: "Expert Assistance",
    description:
      "Get guidance to identify products that match your requirements.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Customer Focus",
    description:
      "A convenient and dependable experience from enquiry to purchase.",
  },
];

const formatPrice = (price) => {
  if (price === null || price === undefined || Number(price) <= 0) {
    return "Contact for Price";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("status", "Active")
          .order("created_at", { ascending: false })
          .limit(4);

        if (error) throw error;

        if (isMounted) {
          setProducts(data || []);
        }
      } catch (error) {
        console.error("Homepage products error:", error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="overflow-hidden bg-white text-[#111827]">

      {/* HERO SECTION */}

      <section className="voltex-hero relative isolate overflow-hidden bg-[#07131f] text-white">

        <div className="hero-grid absolute inset-0 opacity-30" />

        <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full border border-white/[0.07]" />
        <div className="absolute -right-20 -top-20 h-[450px] w-[450px] rounded-full border border-white/[0.07]" />

        <div className="hero-glow absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[150px]" />

        <div className="relative mx-auto grid min-h-[720px] max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-24">

          {/* LEFT CONTENT */}

          <div className="hero-content relative z-10">

            <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-300 sm:text-xs">
                Powering Possibilities Since Day One
              </span>
            </div>

            <h1 className="max-w-3xl text-[clamp(3.2rem,7vw,6.8rem)] font-black leading-[0.98] tracking-[-0.065em]">

              Powering

              <span className="block">Tomorrow.</span>

              <span className="hero-gradient-text mt-2 block">
                Today.
              </span>

            </h1>

            <p className="mt-8 max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
              The right electrical products make all the difference.
              Discover quality essentials, dependable solutions, and
              products designed to keep your world connected.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">

              <Link
                to="/products"
                className="group inline-flex items-center gap-4 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                Explore Collection

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition group-hover:translate-x-1">
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-400"
              >
                Talk to Our Team
                <ArrowRight size={17} />
              </Link>

            </div>

            <div className="mt-16 grid max-w-xl grid-cols-3 border-t border-white/10 pt-8">

              <div>
                <p className="text-lg font-extrabold sm:text-2xl">
                  Quality
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  Driven Selection
                </p>
              </div>

              <div className="border-l border-white/10 pl-5 sm:pl-8">
                <p className="text-lg font-extrabold sm:text-2xl">
                  Reliable
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  Solutions
                </p>
              </div>

              <div className="border-l border-white/10 pl-5 sm:pl-8">
                <p className="text-lg font-extrabold sm:text-2xl">
                  Support
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  When You Need It
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT VISUAL */}

          <div className="hero-visual relative mx-auto w-full max-w-[600px]">

            <div className="absolute -inset-8 rounded-full bg-orange-500/10 blur-[90px]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#122536] p-3 shadow-2xl">

              <div className="relative min-h-[470px] overflow-hidden rounded-[1.5rem] sm:min-h-[570px]">

                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=90"
                  alt="Electrical installation and professional electrical work"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07131f] via-[#07131f]/20 to-[#07131f]/10" />

                <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-3 backdrop-blur-xl">
                  <Zap size={17} className="text-orange-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    VOLTEX ELECTRICALS
                  </span>
                </div>

                <div className="absolute bottom-7 left-6 right-6">

                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                    <span className="h-px w-8 bg-orange-400" />
                    Power. Precision. Performance.
                  </div>

                  <h2 className="max-w-md text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                    Built for the way you power life.
                  </h2>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                    Electrical essentials for homes, businesses, and
                    industrial requirements.
                  </p>

                  <Link
                    to="/products"
                    className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-orange-400"
                  >
                    Discover Our Products
                    <MoveUpRight size={18} />
                  </Link>

                </div>

              </div>
            </div>

            {/* FLOATING CARD */}

            <div className="absolute -bottom-7 -left-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#13283a] p-4 shadow-2xl sm:-left-8 sm:p-5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                <CircuitBoard size={25} />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Electrical Excellence
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Quality in every connection.
                </p>
              </div>

            </div>

            <div className="absolute -right-2 top-20 hidden h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-orange-400 backdrop-blur-xl sm:flex">
              <Power size={36} />
            </div>

          </div>

        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 px-6 py-5 sm:px-12 lg:px-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
            Engineered Around Your Needs
          </span>

          <a
            href="#collections"
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400 transition hover:text-orange-400"
          >
            Scroll to Explore
            <ArrowDown size={16} />
          </a>
        </div>

      </section>

      {/* CATEGORY SECTION */}

      <section
        id="collections"
        className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="section-label">
                WHAT WE OFFER / 01
              </p>

              <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                Everything you need.
                <span className="block text-orange-500">
                  All in one place.
                </span>
              </h2>
            </div>

            <div className="max-w-sm">
              <p className="text-sm leading-7 text-slate-500">
                Explore our electrical collections and find the right
                products for your next project.
              </p>

              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition hover:text-orange-500"
              >
                Explore all products
                <ArrowUpRight size={18} />
              </Link>
            </div>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  to="/products"
                  key={category.number}
                  className="category-card group relative min-h-[360px] overflow-hidden rounded-2xl bg-slate-900"
                >

                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07131f] via-[#07131f]/30 to-transparent" />

                  <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xs font-bold text-white backdrop-blur-md">
                    {category.number}
                  </div>

                  <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition group-hover:bg-orange-500">
                    <Icon size={21} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <h3 className="text-2xl font-extrabold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-300">
                      {category.subtitle}
                    </p>

                    <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-5 text-xs font-bold uppercase tracking-wider text-white">
                      Explore Collection

                      <ArrowUpRight
                        size={19}
                        className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="bg-[#f5f6f7] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>
              <p className="section-label">
                PRODUCT SPOTLIGHT / 02
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
                Featured Products<span className="text-orange-500">.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500">
                A closer look at some of the products available in our
                electrical collection.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 self-start rounded-full border border-slate-300 px-6 py-3 text-sm font-bold transition hover:border-orange-500 hover:bg-orange-500 hover:text-white sm:self-auto"
            >
              View All Products
              <ArrowUpRight size={18} />
            </Link>

          </div>

          {loading ? (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[390px] animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>

          ) : products.length > 0 ? (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {products.map((product) => (

                <Link
                  to="/products"
                  key={product.id}
                  className="product-card group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/50"
                >

                  <div className="relative flex h-[270px] items-center justify-center overflow-hidden bg-[#f7f8fa] p-8">

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <Zap size={65} className="text-slate-300" />
                    )}

                    <span className="absolute left-5 top-5 rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                      Featured
                    </span>

                    <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition group-hover:bg-orange-500 group-hover:text-white">
                      <ArrowUpRight size={19} />
                    </span>

                  </div>

                  <div className="p-6">

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                      {product.category || "Electrical Product"}
                    </p>

                    <h3 className="mt-3 min-h-[48px] text-lg font-bold leading-6 text-slate-900">
                      {product.name}
                    </h3>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

                      <span className="text-base font-extrabold text-slate-950">
                        {formatPrice(product.price)}
                      </span>

                      <span className="text-xs font-bold text-orange-600">
                        View Details
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <ShoppingBag
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Products Coming Soon
              </h3>

              <p className="mt-3 text-sm text-slate-500">
                Our product collection will be available here shortly.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 font-bold text-orange-600"
              >
                Browse Products
                <ArrowRight size={17} />
              </Link>

            </div>

          )}

        </div>
      </section>

      {/* BRAND STATEMENT */}

      <section className="relative overflow-hidden bg-[#07131f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="relative mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="section-label !text-orange-400">
              THE VOLTEX DIFFERENCE / 03
            </p>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              More than products.
              <span className="hero-gradient-text block">
                A promise of quality.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400">
              Every electrical project deserves the right products and
              dependable support. At VOLTEX, we aim to make discovering
              electrical essentials easier and more convenient.
            </p>

            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-orange-500 hover:text-white"
            >
              Discover VOLTEX
              <ArrowUpRight size={18} />
            </Link>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:border-orange-500/40 hover:bg-white/[0.07]"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <Icon size={24} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-slate-600">
                      / {feature.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-lg font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* FINAL CTA */}

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-orange-500 px-7 py-16 text-white sm:px-14 lg:px-20 lg:py-24">

          <div className="absolute -right-20 -top-40 h-[500px] w-[500px] rounded-full border border-white/20" />
          <div className="absolute -right-5 -top-24 h-[350px] w-[350px] rounded-full border border-white/20" />

          <div className="absolute bottom-0 right-0 text-white/[0.06]">
            <Zap size={350} strokeWidth={0.7} />
          </div>

          <div className="relative z-10 max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={15} />
              Let's Build Something Better
            </div>

            <h2 className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              The right connection starts here.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/80">
              Have a requirement or looking for a specific electrical
              product? Let's talk about what you need.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#07131f] px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#07131f]"
              >
                Get in Touch
                <ArrowUpRight size={19} />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}