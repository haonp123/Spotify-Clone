import { useState } from "react";
import toast from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const { reset } = useAuthStore();

  const logout = async () => {
    setLoading(true);
    try {
      googleLogout();
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setAuthUser(null);
      toast.success("Logout successfully");

      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { loading, logout };
};
