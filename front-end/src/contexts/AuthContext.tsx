import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

import { useAuthStore } from "@/stores/useAuthStore";
import { axiosInstance } from "@/lib/axios";
import { useChatStore } from "@/stores/useChatStore";
import { User } from "@/types";

const AuthContext = createContext<{
  authUser: User | null;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: false,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { checkAdminStatus } = useAuthStore();
  const { initSocket } = useChatStore();

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");

        const data = res.data;

        setAuthUser(data);
        initSocket(data._id);

        await checkAdminStatus();
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, [checkAdminStatus, initSocket]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
