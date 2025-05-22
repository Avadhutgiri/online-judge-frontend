// store/authStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axios";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    isLoading: true,
    user: null,
    login: (userData) => {
        set({ isLoggedIn: true, user: userData, isLoading: false });
    },
    logout: () => {
        set({ isLoggedIn: false, user: null, isLoading: false });
    },
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/api/users/verify');
            set({ isLoggedIn: true, isLoading: false, user: response.data.user });
            return true;
        } catch (error) {
            set({ isLoggedIn: false, isLoading: false, user: null });
            return false;
        }
    }
}));

export default useAuthStore;