import {
Target,
Eye,
ShieldCheck,
Users,
Zap,
HeartHandshake,
Lightbulb,
Award,
} from "lucide-react";

export default function About() {
const values = [
{
icon: ShieldCheck,
title: "Quality",
description:
"We focus on providing dependable electrical products that meet customer expectations.",
},
{
icon: HeartHandshake,
title: "Trust",
description:
"We believe in building strong relationships through honest and reliable service.",
},
{
icon: Lightbulb,
title: "Innovation",
description:
"We continuously explore better electrical solutions for changing customer needs.",
},
{
icon: Users,
title: "Customer First",
description:
"Customer satisfaction and support remain at the centre of our approach.",
},
];

return (
<div>
{/* Page Banner */}
<section className="bg-slate-950 px-6 py-24 text-center text-white">
<p className="font-semibold uppercase tracking-widest text-orange-400">
Get to Know Us
</p>

    <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
      About <span className="text-orange-500">VOLTEX</span>
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
      Powering Every Connection. Your destination for quality electrical
      products and dependable solutions.
    </p>
  </section>

  {/* Who We Are */}
  <section className="px-6 py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
      <div className="flex min-h-80 items-center justify-center rounded-3xl bg-orange-50">
        <Zap size={120} className="text-orange-500" />
      </div>

      <div>
        <p className="font-bold uppercase tracking-widest text-orange-500">
          Who We Are
        </p>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          Connecting People With Better Electrical Solutions
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          VOLTEX ELECTRICALS is focused on providing electrical products
          and solutions for residential, commercial, and industrial needs.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          Our approach is built around product quality, customer
          satisfaction, dependable service, and helping customers find
          suitable electrical products for their requirements.
        </p>
      </div>
    </div>
  </section>

  {/* Mission and Vision */}
  <section className="bg-slate-50 px-6 py-20">
    <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
      <div className="rounded-3xl bg-white p-9 shadow-sm">
        <div className="inline-flex rounded-xl bg-orange-100 p-4 text-orange-600">
          <Target size={34} />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Our Mission
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          To make quality electrical products and reliable solutions
          accessible while delivering a positive customer experience.
        </p>
      </div>

      <div className="rounded-3xl bg-slate-950 p-9 text-white shadow-sm">
        <div className="inline-flex rounded-xl bg-orange-500/20 p-4 text-orange-400">
          <Eye size={34} />
        </div>

        <h2 className="mt-6 text-2xl font-bold">
          Our Vision
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          To build a trusted electrical brand recognised for quality,
          customer relationships, and dependable electrical solutions.
        </p>
      </div>
    </div>
  </section>

  {/* Core Values */}
  <section className="px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <p className="font-bold uppercase tracking-widest text-orange-500">
          What We Believe In
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Our Core Values
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <div
              key={value.title}
              className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="inline-flex rounded-xl bg-orange-100 p-4 text-orange-600">
                <Icon size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {value.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Closing Banner */}
  <section className="bg-orange-500 px-6 py-16 text-center text-white">
    <Award size={45} className="mx-auto" />

    <h2 className="mt-5 text-3xl font-bold md:text-4xl">
      Powering Every Connection.
    </h2>

    <p className="mt-4 text-orange-50">
      VOLTEX ELECTRICALS – Quality, Trust and Reliable Solutions.
    </p>
  </section>
</div>

);
}