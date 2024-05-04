import { useInvoice } from "@/Context/InvoiceContext";
import { ScrollArea } from "../shadcn/ScrollArea";
import { formatDate } from "@/Utils/Utils";
import { router } from "@inertiajs/react";

export default function InvoiceHistory() {
  const { allUserInvoicesData } = useInvoice();

  return (
    <div className="bg-white p-6 rounded-xl grid grid-rows-[auto_1fr]">
      <div>
        <h1 className="font-semibold text-xl">Invoice History</h1>
        <p className="text-light text-sm mt-2">
          All Invoice you have created in the past will be shown here. (Click To
          Open)
        </p>
      </div>

      <ScrollArea className="h-0 min-h-full ">
        {allUserInvoicesData.filter(
          (invoice) => invoice.status !== "on_progress"
        ).length <= 0 && (
          <p className="text-sm text-light text-center mt-24">
            You have no invoices created
          </p>
        )}
        <ul className="mt-4 grid gap-4">
          {allUserInvoicesData.map((invoice, i) => {
            console.log(invoice.status);
            if (invoice.status === "on_progress") return;
            const handleOpenDetail = () => {
              router.get(route("invoice.show", invoice.id));
            };

            return (
              <li
                className="py-2 px-4 grid grid-cols-[auto_1fr] gap-x-4 cursor-pointer hover:bg-slate-100 duration-200 transition-all rounded-md"
                onClick={handleOpenDetail}
              >
                <p className="row-span-2">{i + 1}.</p>
                <p className="texxt-dark">#{invoice.invoiceNumber}</p>
                <p className="text-sm text-light">
                  Created At {formatDate(new Date(invoice.createdAt))}
                </p>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
