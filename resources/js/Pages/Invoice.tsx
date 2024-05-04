import InvoiceDetails from "@/Components/invoice/InvoiceDetails";
import InvoiceHeader from "@/Components/invoice/InvoiceHeader";
import InvoiceShippingDetails from "@/Components/invoice/InvoiceShippingDetails";
import { InvoiceProvider } from "@/Context/InvoiceContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TInvoice, TLaravelResource } from "@/Utils/types";
import { PageProps, TProduct } from "@/types";
import { Head } from "@inertiajs/react";

export default function Invoice({
  auth,
  mostRecentInvoice,
  invoiceProducts,
}: PageProps) {
  const mostRecentInvoiceData = mostRecentInvoice as TLaravelResource<TInvoice>;
  const invoiceItemsData = invoiceProducts as TLaravelResource<TProduct[]>;

  return (
    <Authenticated
      user={auth.user}
      className="grid grid-cols-[5fr_4fr] mt-4 flex-1 gap-4"
    >
      <Head title="Invoice" />
      <InvoiceProvider
        invoiceItems={invoiceItemsData.data}
        recentInvoice={mostRecentInvoiceData.data}
      >
        <InvoiceDetails />
        <InvoiceShippingDetails />
      </InvoiceProvider>
    </Authenticated>
  );
}
