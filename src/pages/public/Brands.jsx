import {
  Award,
  ShieldCheck,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Havells",
    category: "Electrical Products",
    description:
      "Electrical equipment, cables, switches, lighting, and home solutions.",
    initials: "H",
  },
  {
    id: 2,
    name: "Polycab",
    category: "Wires & Cables",
    description:
      "Wires, cables, electrical accessories, and related products.",
    initials: "P",
  },
  {
    id: 3,
    name: "Anchor",
    category: "Switches & Accessories",
    description:
      "Switches, sockets, and electrical accessories for everyday use.",
    initials: "A",
  },
  {
    id: 4,
    name: "Philips",
    category: "Lighting Solutions",
    description:
      "Lighting products and solutions for homes and businesses.",
    initials: "PH",
  },
  {
    id: 5,
    name: "Crompton",
    category: "Electrical & Lighting",
    description:
      "Lighting, fans, and electrical products for different applications.",
    initials: "C",
  },
  {
    id: 6,
    name: "V-Guard",
    category: "Electrical Appliances",
    description:
      "Electrical and electronic products for residential applications.",
    initials: "VG",
  },
];

export default function Brands() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <p className="font-semibold uppercase tracking-widest text-orange-400">
          Our Trusted Partners
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
          Brands We <span className="text-orange-500">Offer</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          Explore electrical brands and discover products for your
          residential, commercial, and industrial requirements.
        </p>
      </section>

      {/* Brands Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              Our Brand Collection
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Quality Brands Under One Roof
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Find electrical products from established brands across
              different product categories.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-extrabold text-white transition group-hover:bg-orange-500">
                    {brand.initials}
                  </div>

                  <Award
                    size={28}
                    className="text-orange-500"
                  />
                </div>

                <h3 className="mt-7 text-2xl font-bold text-slate-900">
                  {brand.name}
                </h3>

                <p className="mt-2 text-sm font-semibold text-orange-500">
                  {brand.category}
                </p>

                <p className="mt-4 min-h-14 text-sm leading-7 text-gray-500">
                  {brand.description}
                </p>

                <a
                  href="/products"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-slate-900 transition hover:gap-3 hover:text-orange-500"
                >
                  Explore Products
                  <ArrowRight size={17} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Brands */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              Our Commitment
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              What Matters to Us
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <ShieldCheck
                size={42}
                className="mx-auto text-orange-500"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Quality
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Focus on quality products from recognised brands.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <Star
                size={42}
                className="mx-auto text-orange-500"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Customer Satisfaction
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Helping customers find products that suit their needs.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <Zap
                size={42}
                className="mx-auto text-orange-500"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Reliable Solutions
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Electrical products for different applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-extrabold md:text-4xl">
          Looking for a Specific Brand?
        </h2>

        <p className="mt-4 text-orange-50">
          Contact us to enquire about product availability.
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