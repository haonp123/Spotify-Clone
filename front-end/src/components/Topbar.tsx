import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { LayoutDashboardIcon } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthContext } from "@/contexts/AuthContext";
import { Button, buttonVariants } from "./ui/button";
import { useLogin } from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const { isAdmin } = useAuthStore();

  const { login } = useLogin();
  const { logout } = useLogout();

  const handleLogin = async (credential) => {
    await login(credential);
  };

  const handleLogout = async () => {
    await logout();
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
          <Button onClick={handleLogout}>Log out</Button>
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
