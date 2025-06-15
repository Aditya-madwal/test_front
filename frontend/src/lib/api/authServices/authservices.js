import api from "../apiConfig";
import { useContext } from "react";
import { MyContext } from "../../../MyContext";

// const { me, setMe } = useContext(MyContext);

const authServices = {
    // Login service
    login: async (username, password) => {
        try {
            const response = await api.post("/users/userapi/token/", {
                username,
                password,
            });

            if (response.data.access) {
                localStorage.setItem("token", response.data.access);
                const authResponse = await authServices.isAuthenticated();
            }

            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Login failed";
        }
    },

    // Register service
    register: async (userData) => {
        try {
            const response = await api.post("/users/register", userData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        }
    },

    // Logout service
    logout: () => {
        try {
            localStorage.removeItem("token");
        } catch (error) {
            throw "Logout failed";
        }
    },

    // Check if user is logged in and return user data if yes 
    isAuthenticated: async () => {
        try {
            const response = await api.get("/users/isauthenticated");
            if (response.data.isAuthenticated) {
                console.log(response.data.user)
                return {
                    isAuthenticated: true,
                    user: response.data.user,
                    message: response.data.message
                };
            }
            return {
                isAuthenticated: false,
                user: null,
                message: response.data.message
            };
        } catch (error) {
            return {
                isAuthenticated: false,
                user: null,
                message: error.response?.data?.message || "Authentication check failed"
            };
        }
    }
};

export default authServices;
