import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

import { useAuthStore } from "@/stores/useAuthStore";

type UserType = {
  id: string;
  fullName: string;
  imageUrl: string;
};

const AuthContext = createContext<{
  authUser: UserType | null;
  setAuthUser: Dispatch<SetStateAction<UserType | null>>;
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
  const [authUser, setAuthUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        setAuthUser(data);

        await checkAdminStatus();
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
