import {
  useState,
  PropsWithChildren,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { TUser } from "@/types";
import Navbar from "./Navbar/Navbar";
import { cn } from "@/Utils/Utils";
import PopupProvider from "@/Context/PopupContext";
import { TLaravelResource } from "@/Utils/types";

type TAuthContextValues = {
  user: TUser;
};

const AuthContext = createContext<TAuthContextValues | null>(null);
export default function Authenticated({
  user,
  header,
  children,
  className,
}: PropsWithChildren<{
  user: TLaravelResource<TUser>;
  header?: ReactNode;
  className?: string;
}>) {
  return (
    <AuthContext.Provider value={{ user: user.data }}>
      <div className="bg-gray-100 p-4 flex flex-col min-h-screen">
        <Navbar user={user} />

        <PopupProvider>
          <main className={className}>{children}</main>
        </PopupProvider>
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside of it's Provider's scope");
  return context;
}
