import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { TUser } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import Navigator from "./Navigator";
import MobileNavbar from "./MobileNavbar";
import { TLaravelResource } from "@/Utils/types";
import { cn } from "@/Utils/Utils";

export default function Navbar({ user }: { user: TLaravelResource<TUser> }) {
  const isAdmin = user.data.role === "admin";
  return (
    <nav className="bg-white border-b border-gray-100 rounded-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <h1 className="flex items-center justify-center ">
            Welcome Back, {user.data.name} 👋
            <div
              className={cn(
                "text-sm px-4 py-[0.125rem] rounded-full ml-4",
                isAdmin ? "bg-accent text-white" : "bg-bg text-dark"
              )}
            >
              {isAdmin ? "Admin" : "User"}
            </div>
          </h1>
          <Navigator user={user.data} />
          <ProfileDropdown user={user.data} />
        </div>
      </div>
      <MobileNavbar />
    </nav>
  );
}
