import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import authServices from "../lib/api/authServices/authservices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setMe } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const loginResponse = await authServices.login(username, password);

      if (!loginResponse.access) {
        throw new Error("No access token received");
      }

      const authResponse = await authServices.isAuthenticated();

      if (!authResponse.isAuthenticated) {
        toast.error("Failed to authenticate user");
      } else {
        console.log(authResponse);
        setMe(authResponse.user);
        toast.success("Login successful!");
      }

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-screen">
      <div className="lg:grid lg:grid-cols-12 lg:h-full">
        {/* Sidebar with Image */}
        <aside className="relative lg:col-span-5 xl:col-span-6 h-full hidden lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1738467990752-6e00e436919d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover p-8 rounded-[100px]"
          />
        </aside>

        {/* Form Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 overflow-y-auto">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg flex flex-col items-center">
                  <ClipLoader color="#4F46E5" size={50} />
                  <p className="mt-3 text-gray-700">Logging in...</p>
                </div>
              </div>
            )}

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome Back 👋
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please sign in to your account to continue
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6">
              {/* Username */}
              <div className="col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="Enter your password"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-block shrink-0 rounded-md border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500 disabled:opacity-50">
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don't have an account?{" "}
                  <Link to="/auth/register" className="text-gray-700 underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Login;
