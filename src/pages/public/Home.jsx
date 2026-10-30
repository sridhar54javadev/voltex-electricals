import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Quality Products",
      description: "Reliable electrical products from trusted manufacturers.",
    },
    {
      icon: Award,
      title: "Trusted Brands",
      description: "Explore products from leading electrical brands.",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Get assistance in choosing the right products.",
    },
    {
      icon: Truck,
      title: "Reliable Service",
      description: "Customer-focused service for your electrical needs.",
    },
  ];

  const categories = [
    "Lighting Solutions",
    "Wires & Cables",
    "Switches & Sockets",
    "Electrical Accessories",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-950 px-6 py-24 text-white md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/40 px-4 py-2 text-sm text-orange-400">
              <Zap size={16} />
              Your Trusted Electrical Store
            </p>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Powering Your World With
              <span className="block text-orange-500">
                Quality Electricals.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Discover quality electrical products, trusted brands, and
              reliable solutions for your homes, businesses, and industries.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
              >
                Explore Products <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="rounded-lg border border-white/30 px-7 py-4 font-semibold transition hover:bg-white hover:text-slate-950"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-3xl border border-white/10 bg-slate-900 p-10">
            <div className="text-center">
              <Zap size={100} className="mx-auto text-orange-500" />
              <h2 className="mt-6 text-3xl font-bold">
                VOLTEX ELECTRICALS
              </h2>
              <p className="mt-3 text-slate-400">
                Powering Every Connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Everything You Need, Under One Roof
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-orange-100 p-4 text-orange-600">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold uppercase tracking-widest text-orange-500">
                Our Products
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Explore Product Categories
              </h2>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-semibold text-orange-600"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                to="/products"
                key={category}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-orange-400 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-orange-400">
                  <Zap size={28} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {category}
                </h3>

                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-orange-600">
                  Explore Category
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-orange-500 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Looking for the Right Electrical Solutions?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-orange-50">
          Connect with VOLTEX ELECTRICALS and let us help you find the right
          products for your requirements.
        </p>

        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
        >
          Get in Touch <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}