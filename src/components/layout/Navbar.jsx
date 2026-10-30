import { NavLink } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";

export default function Navbar() {
return ( <nav className="border-b border-gray-100 bg-white"> <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 py-4">
{siteConfig.navigation.map((item) => (
<NavLink
key={item.path}
to={item.path}
className={({ isActive }) =>
`rounded-md px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`
}
>
{item.label} </NavLink>
))} </div> </nav>
);
}
