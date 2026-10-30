import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, LockKeyhole, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary demo credentials
    const adminEmail = "admin@voltex.com";
    const adminPassword = "Voltex@123";

    if (
      formData.email === adminEmail &&
      formData.password === adminPassword
    ) {
      localStorage.setItem("voltex_admin_logged_in", "true");

      toast.success("Login successful!");

      navigate("/admin");
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">

        {/* Left Branding Section */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-blue-950 p-10 text-white">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-orange-500/10" />

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
                <Zap size={28} />
              </div>

              <h1 className="text-xl font-bold">
                VOLTEX <span className="text-orange-400">ELECTRICALS</span>
              </h1>
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              Administration Portal
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight">
              Manage Your Business With Confidence.
            </h2>

            <p className="mt-5 leading-7 text-blue-200">
              Access your business dashboard and manage products,
              services, brands, customer enquiries and website content
              from one place.
            </p>
          </div>

          <div className="relative z-10 mt-16">
            <div className="h-1 w-16 rounded-full bg-orange-500" />

            <p className="mt-5 text-sm text-blue-200">
              Powering Every Connection.
            </p>

            <p className="mt-2 text-xs text-blue-300">
              © {new Date().getFullYear()} VOLTEX ELECTRICALS
            </p>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-950">
                Welcome Back!
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Please enter your administrator credentials.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-orange-500 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-600"
              >
                Sign In to Dashboard
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm font-bold text-orange-800">
                Demo Login Credentials
              </p>

              <p className="mt-2 text-sm text-gray-700">
                Email: admin@voltex.com
              </p>

              <p className="mt-1 text-sm text-gray-700">
                Password: Voltex@123
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
              Authorized administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}