import {
  Wrench,
  Settings,
  ShieldCheck,
  Lightbulb,
  Zap,
  Cable,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Electrical Installation",
    description:
      "Professional electrical installation solutions for residential, commercial, and industrial spaces.",
    icon: Zap,
  },
  {
    id: 2,
    title: "Electrical Maintenance",
    description:
      "Reliable maintenance support to keep electrical systems operating safely and efficiently.",
    icon: Wrench,
  },
  {
    id: 3,
    title: "Wiring Solutions",
    description:
      "Quality wiring solutions for new buildings, renovations, and electrical upgrades.",
    icon: Cable,
  },
  {
    id: 4,
    title: "Electrical Consultation",
    description:
      "Guidance in selecting suitable electrical products and solutions for your requirements.",
    icon: Lightbulb,
  },
  {
    id: 5,
    title: "Electrical Safety",
    description:
      "Electrical safety products and solutions designed to support safer electrical systems.",
    icon: ShieldCheck,
  },
  {
    id: 6,
    title: "Technical Support",
    description:
      "Product guidance and support to help customers choose the right electrical equipment.",
    icon: Settings,
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <p className="font-semibold uppercase tracking-widest text-orange-400">
          What We Offer
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
          Our <span className="text-orange-500">Services</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          Complete electrical solutions, quality products, and dependable
          customer support for your electrical requirements.
        </p>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-bold uppercase tracking-widest text-orange-500">
              Our Expertise
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Electrical Solutions You Can Trust
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              We focus on quality, reliability, and customer satisfaction
              across our range of electrical services.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="group rounded-2xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-50 transition group-hover:bg-orange-500">
                    <Icon
                      size={32}
                      className="text-orange-500 transition group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-4 min-h-20 text-sm leading-7 text-gray-500">
                    {service.description}
                  </p>

                  <a
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-bold text-orange-500 transition hover:gap-3"
                  >
                    Enquire Now
                    <ArrowRight size={17} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-widest text-orange-500">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Your Reliable Electrical Solutions Partner
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We aim to provide dependable electrical products and
              customer-focused solutions. Our priority is to make
              electrical product selection easier for every customer.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <Zap size={30} className="text-orange-500" />

              <h3 className="mt-4 font-bold text-slate-900">
                Quality
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Focus on dependable products.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <ShieldCheck size={30} className="text-orange-500" />

              <h3 className="mt-4 font-bold text-slate-900">
                Reliability
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Customer-focused solutions.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <Wrench size={30} className="text-orange-500" />

              <h3 className="mt-4 font-bold text-slate-900">
                Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Helpful product guidance.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <Lightbulb size={30} className="text-orange-500" />

              <h3 className="mt-4 font-bold text-slate-900">
                Solutions
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Practical electrical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-orange-500 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-extrabold md:text-4xl">
          Looking for Electrical Solutions?
        </h2>

        <p className="mt-4 text-orange-50">
          Talk to our team about your requirements.
        </p>

        <a
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
        >
          <MessageCircle size={19} />
          Contact Us
        </a>
      </section>
    </div>
  );
}