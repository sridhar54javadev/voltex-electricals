import { useEffect, useState } from "react";
import {
BrowserRouter,
Routes,
Route,
Navigate,
} from "react-router-dom";

import { supabase } from "./lib/supabase";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Products from "./pages/public/Products";
import Services from "./pages/public/Services";
import Brands from "./pages/public/Brands";
import Gallery from "./pages/public/Gallery";
import Contact from "./pages/public/Contact";

import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import AdminProducts from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import AdminServices from "./pages/admin/Services";
import AdminBrands from "./pages/admin/Brands";
import AdminGallery from "./pages/admin/Gallery";
import Testimonials from "./pages/admin/Testimonials";
import Enquiries from "./pages/admin/Enquiries";
import WebsiteSettings from "./pages/admin/WebsiteSettings";

function LoadingScreen() {
return (
<div className="flex min-h-screen items-center justify-center bg-gray-100">
<div className="text-center">
<div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
<p className="mt-4 text-sm text-gray-600">
Checking authentication...
</p>
</div>
</div>
);
}

function ProtectedRoute({ children, session, loading }) {
if (loading) {
return <LoadingScreen />;
}

return session ? children : <Navigate to="/admin/login" replace />;
}

function LoginRoute({ session, loading }) {
if (loading) {
return <LoadingScreen />;
}

return session ? <Navigate to="/admin" replace /> : <Login />;
}

function NotFound() {
return (
<h1 className="p-20 text-center text-4xl">
404 - Page Not Found
</h1>
);
}

export default function App() {
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
let mounted = true;

const getInitialSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (!mounted) return;

  if (error) {
    console.error("Session check failed:", error.message);
  }

  setSession(data?.session ?? null);
  setLoading(false);
};

getInitialSession();

const {
  data: { subscription },
} = supabase.auth.onAuthStateChange((_event, newSession) => {
  if (!mounted) return;

  setSession(newSession);
  setLoading(false);
});

return () => {
  mounted = false;
  subscription.unsubscribe();
};

}, []);

return (
<BrowserRouter>
<Routes>
{/* Public Website */}
<Route element={<PublicLayout />}>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/products" element={<Products />} />
<Route path="/services" element={<Services />} />
<Route path="/brands" element={<Brands />} />
<Route path="/gallery" element={<Gallery />} />
<Route path="/contact" element={<Contact />} />
</Route>

    {/* Admin Login */}
    <Route
      path="/admin/login"
      element={
        <LoginRoute
          session={session}
          loading={loading}
        />
      }
    />

    {/* Protected Admin Panel */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute
          session={session}
          loading={loading}
        >
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="categories" element={<Categories />} />
      <Route path="services" element={<AdminServices />} />
      <Route path="brands" element={<AdminBrands />} />
      <Route path="gallery" element={<AdminGallery />} />
      <Route path="testimonials" element={<Testimonials />} />
      <Route path="enquiries" element={<Enquiries />} />
      <Route path="settings" element={<WebsiteSettings />} />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

);
}