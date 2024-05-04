import { useInvoice } from "@/Context/InvoiceContext";
import { formatNumber } from "@/Utils/Utils";
import Button from "../general/Button";
import { Link } from "@inertiajs/react";
import { ScrollArea } from "../shadcn/ScrollArea";

export default function InvoiceList() {
  const { invoiceItems } = useInvoice();
  return (
    <>
      {invoiceItems.length === 0 && (
        <div className="pt-6 flex items-center justify-center ">
          <p className="text-sm text-light">No Items Has Been Added Yet</p>
        </div>
      )}
      <ScrollArea className="min-h-full h-0 px-6 py-6">
        <ul className="flex flex-col gap-5">
          {invoiceItems.map((item, i) => {
            return (
              <li className="flex justify-between">
                <p className="truncate max-w-[10rem] text-sm">
                  {i + 1}. {item.name}
                </p>
                <div className="flex gap-2 text-lighter">
                  <p className="text-light text-sm">
                    IDR {formatNumber(item.price)}
                  </p>
                  <i className="bx bx-x cursor-pointer hover:text-dark duration-200 transition-all"></i>
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
      <div className="flex-1 w-full px-6 py-6">
        {invoiceItems.length > 0 && (
          <Link href="/invoice">
            <Button className="w-full">Finalize Invoice</Button>
          </Link>
        )}
      </div>
    </>
  );
}
