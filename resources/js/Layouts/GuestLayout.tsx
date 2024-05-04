import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import illustration from "../../../public/login_illustration.png";
import { cn } from "@/Utils/Utils";

export default function Guest({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("min-h-screen grid grid-cols-2 bg-white")}>
      <div className={cn("p-6", className)}>{children}</div>
      <div className="h-0 min-h-full p-6 rounded-xl overflow-hidden">
        <img
          src={illustration}
          alt=""
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
