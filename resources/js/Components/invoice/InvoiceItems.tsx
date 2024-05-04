import { useInvoice } from "@/Context/InvoiceContext";
import { cn, formatNumber } from "@/Utils/Utils";

export default function InvoiceItems() {
  const { invoiceItems } = useInvoice();
  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b-[1px] px-6 my-6">
        <div>
          <h1 className="text-xl text-dark font-semibold">Product</h1>
          <p className="text-light text-sm border-lighter mb-4">
            Lists of products that has been added to your Invoice
          </p>
        </div>
      </div>
      <ul className="flex flex-col">
        {invoiceItems.map((product) => {
          return (
            <li
              key={product.id}
              className={cn(
                "h-20 grid grid-cols-[1fr_1fr_auto] active:bg-slate-300 hover:bg-slate-100 cursor-pointer duration-200 transition-all px-6"
              )}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
