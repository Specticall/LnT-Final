import { useProduct } from "@/Context/ProductContext";
import Button from "../general/Button";
import { useAuth } from "@/Layouts/AuthenticatedLayout";
import InvoiceProductList from "./InvoiceProductList";

export default function InvoiceProductDisplay() {
  const { user } = useAuth();
  return (
    <article className="bg-white py-6 rounded-xl grid grid-rows-[auto_1fr]">
      <div className="flex justify-between items-center pb-4 border-b-[1px] px-6">
        <div>
          <h1 className="text-xl text-dark font-semibold">Product</h1>
          <p className="text-light text-sm border-lighter">
            Lists of products that has been added to our inventory
          </p>
        </div>
        {user.role === "admin" && (
          <Button className="row-span-2 text-sm">Add Product +</Button>
        )}
      </div>
      <InvoiceProductList />
    </article>
  );
}
