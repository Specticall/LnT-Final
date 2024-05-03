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

export default function Navbar({ user }: { user: TLaravelResource<TUser> }) {
  return (
    <nav className="bg-white border-b border-gray-100 rounded-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <h1 className="flex items-center justify-center ">
            Welcome Back,{" "}
            {user.data.role === "admin" ? "Admin" : user.data.name} 👋
          </h1>
          <Navigator />
          <ProfileDropdown user={user.data} />
        </div>
      </div>
      <MobileNavbar />
    </nav>
  );
}
