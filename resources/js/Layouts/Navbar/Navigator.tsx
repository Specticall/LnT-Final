import NavLink from "@/Components/NavLink";
import { TUser } from "@/types";

const routes = [
  {
    route: "product.index",
    display: "Product",
  },
  // {
  //   route: "invoice.index",
  //   display: "Current Invoice",
  // },
];

export default function Navigator({ user }: { user: TUser }) {
  if (user.role === "admin") return;
  return (
    <div className="flex flex-1">
      <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
        {routes.map((item) => {
          return (
            <NavLink
              href={route(item.route)}
              active={route().current(item.route)}
            >
              {item.display}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
