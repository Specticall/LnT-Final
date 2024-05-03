import NavLink from "@/Components/NavLink";

const routes = [{ route: "product.index", display: "Product" }];

export default function Navigator() {
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
