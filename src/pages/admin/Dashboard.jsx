import {
  Package,
  Users,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const monthlyData = [
  { month: "Jan", enquiries: 12 },
  { month: "Feb", enquiries: 19 },
  { month: "Mar", enquiries: 15 },
  { month: "Apr", enquiries: 28 },
  { month: "May", enquiries: 24 },
  { month: "Jun", enquiries: 35 },
  { month: "Jul", enquiries: 30 },
  { month: "Aug", enquiries: 42 },
  { month: "Sep", enquiries: 38 },
  { month: "Oct", enquiries: 48 },
  { month: "Nov", enquiries: 44 },
  { month: "Dec", enquiries: 55 },
];

const recentActivities = [
  {
    title: "New product added",
    description: "LED Panel Light",
    time: "Today",
    color: "bg-blue-100 text-blue-600",
    icon: Package,
  },
  {
    title: "New customer enquiry",
    description: "Electrical installation enquiry",
    time: "Today",
    color: "bg-green-100 text-green-600",
    icon: MessageSquare,
  },
  {
    title: "Brand updated",
    description: "Havells",
    time: "Yesterday",
    color: "bg-orange-100 text-orange-600",
    icon: Zap,
  },
];

function getCount(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data.length : 0;
  } catch {
    return 0;
  }
}

export default function Dashboard() {
  const products = getCount("voltex_products");
  const enquiries = getCount("voltex_enquiries");
  const categories = getCount("voltex_categories");
  const newEnquiries = (() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("voltex_enquiries") || "[]"
      );
      return Array.isArray(data)
        ? data.filter((item) => item.status === "New").length
        : 0;
    } catch {
      return 0;
    }
  })();

  const stats = [
    {
      title: "Total Products",
      value: products,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
      change: "Manage products",
    },
    {
      title: "Total Enquiries",
      value: enquiries,
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
      change: "Customer messages",
    },
    {
      title: "Categories",
      value: categories,
      icon: ShoppingBag,
      color: "bg-purple-100 text-purple-600",
      change: "Product categories",
    },
    {
      title: "New Enquiries",
      value: newEnquiries,
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      change: "Awaiting response",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950 md:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600">
          <Clock size={16} className="mr-2 inline" />
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={24} />
                </div>

                <ArrowUpRight className="text-gray-400" size={20} />
              </div>

              <h3 className="mt-5 text-sm font-medium text-gray-500">
                {stat.title}
              </h3>

              <p className="mt-1 text-3xl font-bold text-blue-950">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart and Activities */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Enquiry Chart */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Enquiry Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sample monthly enquiry statistics
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp size={18} />
              Business Overview
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="enquiryGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#f97316"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#f97316"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="enquiries"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#enquiryGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-blue-950">
            Recent Activities
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest business updates
          </p>

          <div className="mt-6 space-y-6">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={index} className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Information */}
      <div className="rounded-xl bg-blue-950 p-7 text-white">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="text-xl font-bold">
              VOLTEX ELECTRICALS
            </h2>

            <p className="mt-2 text-sm text-blue-200">
              Powering Every Connection.
            </p>

            <p className="mt-3 max-w-xl text-sm text-blue-100">
              Manage your products, services, customer enquiries
              and website content from one central dashboard.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500">
            <Zap size={35} />
          </div>
        </div>
      </div>
    </div>
  );
}