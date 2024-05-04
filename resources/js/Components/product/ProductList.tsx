import { useProduct } from "@/Context/ProductContext";
import { ScrollArea } from "../shadcn/ScrollArea";
import { cn, formatNumber } from "@/Utils/Utils";
import { router } from "@inertiajs/react";
import { TProduct } from "@/types";
import { useAuth } from "@/Layouts/AuthenticatedLayout";
import { useInvoice } from "@/Context/InvoiceContext";

export default function ProductList() {
  const { products, selectProduct, selectedProduct } = useProduct();

  const handleDelete = (productId: string) => () => {
    router.delete(route("product.destroy", productId));
  };

  const handleSelect: (
    product: TProduct
  ) => React.MouseEventHandler<HTMLLIElement> = (product) => (e) => {
    console.log((e.target as HTMLElement).closest(".bx-trash"));
    if ((e.target as HTMLElement).closest(".bx-trash")) return;
    selectProduct(product);
  };
  return (
    <ScrollArea className="min-h-full h-0 flex flex-col relative">
      <ul className="flex flex-col">
        {products.map((product) => {
          const isSelected = product.id === selectedProduct?.id;

          return (
            <li
              key={product.id}
              className={cn(
                "h-20 grid grid-cols-[1fr_1fr_auto] active:bg-slate-300 hover:bg-slate-100 cursor-pointer duration-200 transition-all px-6",
                isSelected && "bg-slate-200 hover:bg-slate-200"
              )}
              onClick={handleSelect(product)}
            >
              <header className="flex gap-4 place-items-center overflow-hidden">
                <img
                  src={product.imageURL}
                  alt="product image"
                  className="h-16 aspect-square object-cover rounded-md"
                />
                <div className="overflow-hidden">
                  <p className="truncate text-md font-medium text-dark">
                    {product.name}
                  </p>
                  <p className="truncate text-sm text-light">
                    {product.category}
                  </p>
                </div>
              </header>
              <p className="justify-self-end self-center text-sm">
                IDR {formatNumber(product.price)}
              </p>

              <i
                className="bx bx-trash self-center ml-4 text-light hover:text-accent cursor-pointer transition-all duration-200"
                onClick={handleDelete(product.id)}
              ></i>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}
