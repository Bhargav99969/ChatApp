import { create } from "zustand";
import { axiosInstance } from "../config";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignup: false,
  isLogin: false,
  isUpdating: false,
  isCheckinauth: true,
  OnlineUser:[],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      console.log("error in check");
      set({ authUser: null });
    } finally {
      set({ isCheckinauth: false });
    }
  },

  signup: async (data) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Accoutn created succsefully");
      get().connectSocket();
    } catch (error) {
      toast.error("error");
    } finally {
      set({ isSignup: false });
    }
  },
  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Welcome Back");
      get().connectSocket();
    } catch (error) {
      toast.error("error");
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Succefully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error");
    }
  },
  updateprofile: async () => {
    set({ isUpdating: ture });
    try {
      const res = await axiosInstance.put("/auth/update-Profle", data);
      toast.success("Updated");
    } catch (error) {
      toast.error("error");
    } finally {
      set({ isUpdating: false });
    }
  },
  connectSocket: () => {
  const { authUser } = get();
  if (!authUser || get().socket?.connected) return;

  const newsocket = io("https://chatappbackend-tc7v.onrender.com", {
    query: {
      userId: authUser?._id,
    },
  });

  set({ socket: newsocket });

  newsocket.on("x", (userIds) => {
   
     console.log("Online users received:", userIds);
     
      if (Array.isArray(userIds)) {
        set({ OnlineUser: userIds });
      } else {
        set({ OnlineUser: [] });
      }
  });

  console.log("User connected to socket");
},

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
    console.log("userDisconeected");
  },
}));
