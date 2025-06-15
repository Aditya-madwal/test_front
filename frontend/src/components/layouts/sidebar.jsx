import { useContext, useState } from "react";
import { X, Home, Calendar, LogOut, CircleUserRound } from "lucide-react";
import { MyContext } from "../../MyContext";
import { Link, useNavigate } from "react-router-dom";

const LogoutModal = ({ isOpen, onClose, navigate }) => {
  if (!isOpen) return null;
  const { setMe } = useContext(MyContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMe(null);
    navigate("/auth/login");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Logout
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 flex items-center gap-2"
          >
            <LogOut size={18} className="transform-gpu scale-x-[-1]" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ active }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const { me } = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(active?.toLowerCase());
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={24} />,
      link: "/",
      tab: "dashboard",
    },
    {
      name: "Schedule",
      icon: <Calendar size={24} />,
      link: "/schedule",
      tab: "schedule",
    },
    {
      name: "Profile",
      icon: <CircleUserRound size={24} />,
      link: "/profile",
      tab: "profile",
    },
  ];

  return (
    <>
      <div className="flex h-screen">
        <div
          className={`flex h-screen flex-col justify-between bg-white transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={toggleSidebar}
                className={`grid h-10 place-content-center rounded-lg bg-gray-100 text-lg font-semibold text-gray-600 transition-all duration-300 w-full`}
              >
                {isSidebarOpen ? "Aristotle.ai" : "A"}
              </button>
            </div>

            <ul className="mt-6 space-y-1">
              {menuItems.map(({ name, icon, link, tab }) => (
                <li key={tab}>
                  <Link
                    to={link}
                    onClick={() => setActiveTab(tab)}
                    className={`flex 
                      ${isSidebarOpen ? "justify-start" : "justify-center"}
                      items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                        activeTab === tab
                          ? "text-[#7f55e0] bg-[#7f55e0] bg-opacity-20"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    <span className="flex-shrink-0">{icon}</span>
                    {isSidebarOpen && name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <button
              onClick={() => setLogoutModalOpen(true)}
              className="relative group flex items-center gap-2 cursor-pointer bg-pink-100 p-2 transition-colors duration-200 w-full justify-center"
            >
              <LogOut
                size={24}
                className="text-pink-500 transform-gpu scale-x-[-1]"
              />
              {isSidebarOpen && <span className="text-pink-500">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        navigate={navigate}
      />
    </>
  );
};

export default Sidebar;
