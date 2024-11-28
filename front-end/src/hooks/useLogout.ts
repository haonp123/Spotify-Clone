import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { axiosInstance } from "@/lib/axios";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const { reset } = useAuthStore();

  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      googleLogout();
      await axiosInstance.post("/auth/logout");

      setAuthUser(null);
      toast.success("Logout successfully");

      reset();

      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { loading, logout };
};
