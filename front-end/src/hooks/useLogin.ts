import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { checkAdminStatus } = useAuthStore();

  const login = async (credential: string) => {
    setLoading(true);

    try {
      const obj = {
        token: credential,
      };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success("Welcome to back!");
      setAuthUser(data.user);

      await checkAdminStatus();
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return { loading, login };
};
