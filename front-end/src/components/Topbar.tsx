import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { LayoutDashboardIcon } from "lucide-react";

import { useAuthContext } from "@/contexts/AuthContext";
import { buttonVariants } from "./ui/button";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import UserButton from "./UserButton";

const Topbar = () => {
  const { authUser } = useAuthContext();
  const { isAdmin } = useAuthStore();

  const { login } = useLogin();

  const handleLogin = async (credential: any) => {
    await login(credential);
  };

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="spotify-logo" />
        Spotify
      </Link>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}
        {authUser ? (
          <UserButton />
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;
