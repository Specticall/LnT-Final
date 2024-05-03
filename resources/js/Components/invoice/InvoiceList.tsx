import { useInvoice } from "@/Context/InvoiceContext";
import { formatNumber } from "@/Utils/Utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Button from "../general/Button";

export default function InvoiceList() {
  const { invoiceItems } = useInvoice();
  return (
    <>
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
        <Button className="w-full">Finalize Invoice</Button>
      </div>
    </>
  );
}
