import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

const BASE_URL= import.meta.env.MODE === "development"? "http://localhost:5001" :"/";
// this has all the variables to be used globally
export const authStore = create((set, get) => ({
  //create is zustand inbuilt function
  //state variables:
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      // console.log("updated authuser..",res.data)

      get().connectSocket()

    } catch (error) {
      console.log("error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Sign-Up is Successfull");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Successfully Logged In");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
      get().disconnectSocket()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("error in profile image", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const {authUser} = get()
    if(!authUser || get().socket?.connected ) return;

    const socket= io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect()
    set({ socket:socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

  },

  disconnectSocket: () => {
    if(get().socket?.connected ) get().socket.disconnect()
  },

}));
