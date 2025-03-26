import {create} from "zustand";
import {axiosInstance} from  "../lib/axios.js"
import toast from "react-hot-toast";


// this has all the variables to be used globally 
export const authStore = create((set)=>({//create is zustand inbuilt function
    //state variables:
    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth: async () => {
        try {
            const res= await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            console.log("error in checkAuth:", error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:true})
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true});
        try {
           const res = await axiosInstance.post("/auth/signup",data);
           set({authUser:res.data});
           toast.success("Sign-Up is Successfull")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }finally{
            set({isSigningUp:false});
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged Out Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    },

}))