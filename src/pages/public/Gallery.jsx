import {
  Images,
  Store,
  Lightbulb,
  Cable,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Electrical Showroom",
    category: "Showroom",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
    icon: Store,
  },
  {
    id: 2,
    title: "Modern Lighting Collection",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "Electrical Products",
    category: "Products",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900",
    icon: Zap,
  },
  {
    id: 4,
    title: "Lighting Designs",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900",
    icon: Lightbulb,
  },
  {
    id: 5,
    title: "Electrical Wiring",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900",
    icon: Cable,
  },
  {
    id: 6,
    title: "Interior Lighting",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900",
    icon: Lightbulb,
  },
];

export default function Gallery() {
  return (
    <div>
      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <p className="font-semibold uppercase tracking-widest text-orange-400">
          Our Visual Collection
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
          Our <span className="text-orange-500">Gallery</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          Take a look at our electrical products, lighting collections,
          showroom displays, and more.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-widest text-orange-500">
                Explore Our Collection
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                Moments & Collections
              </h2>
            </div>

            <p className="max-w-md leading-7 text-gray-500">
              Discover different electrical products and collections
              available at VOLTEX ELECTRICALS.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
                      <div className="rounded-lg bg-orange-500 p-2">
                        <Icon size={20} />
                      </div>

                      <span className="text-sm font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute right-5 top-5 rounded-full bg-white/90 p-3 text-slate-900 opacity-0 transition group-hover:opacity-100">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6">
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <Images size={20} className="text-orange-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-orange-500 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-extrabold md:text-4xl">
          Want to Explore Our Products?
        </h2>

        <p className="mt-4 text-orange-50">
          Discover our electrical product collections.
        </p>

        <a
          href="/products"
          className="mt-8 inline-block rounded-lg bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
        >
          Explore Products
        </a>
      </section>
    </div>
  );
}