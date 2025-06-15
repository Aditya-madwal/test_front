import React from "react";
import { Settings, Search, Menu } from "lucide-react";
// import { LogOut } from "lucide-react";
import { MyContext } from "../../MyContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import process from "process";

const Header = () => {
  const { me } = useContext(MyContext);

  return (
    <header className="w-full bg-white px-6 py-3 h-fit">
      <div className="flex items-center justify-between gap-4">
        <button className="block lg:hidden p-2 hover:bg-gray-100 rounded-full">
          <Menu size={24} className="text-gray-600" />
        </button>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-white rounded-full pl-10 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile */}
          <Link
            to="/profile"
            className="flex items-center bg-white p-2 hover:bg-gray-50 rounded-full transition-colors duration-200">
            <img
              alt="User Profile"
              src={`${
                import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
              }${me?.pfp}`}
              className="size-10 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
