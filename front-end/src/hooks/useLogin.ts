import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { axiosInstance } from "@/lib/axios";
import { useChatStore } from "@/stores/useChatStore";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { checkAdminStatus } = useAuthStore();
  const { initSocket } = useChatStore();

  const login = async (credential: string) => {
    setLoading(true);

    try {
      const obj = {
        token: credential,
      };
      const res = await axiosInstance.post("/auth/login", obj, {
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = res.data;

      toast.success("Welcome to back!");
      setAuthUser(data.user);
      initSocket(data.user._id);

      await checkAdminStatus();
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return { loading, login };
};
