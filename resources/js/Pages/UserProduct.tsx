import InvoiceHistory from "@/Components/invoice/InvoiceHistory";
import InvoicePreview from "@/Components/invoice/InvoicePreview";
import InvoiceProductDisplay from "@/Components/invoice/InvoiceProductDisplay";
import { InvoiceProvider } from "@/Context/InvoiceContext";
import PopupProvider from "@/Context/PopupContext";
import { ProductProvider } from "@/Context/ProductContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TInvoice, TLaravelResource } from "@/Utils/types";
import { PageProps, TProduct } from "@/types";
import { Head } from "@inertiajs/react";

export default function UserProduct({
  auth,
  products,
  serverMessage,
  invoiceProducts,
  recentInvoice,
  allUserInvoices,
}: PageProps) {
  const recentInvoiceData = recentInvoice as TLaravelResource<TInvoice>;
  const allUserInvoicesData = allUserInvoices as TLaravelResource<TInvoice[]>;
  const productData = products as TLaravelResource<TProduct[]>;
  const invoiceProductData = invoiceProducts as TLaravelResource<TProduct[]>;
  return (
    <Authenticated
      user={auth.user}
      className="grid grid-cols-[1fr_2fr_1fr] mt-4 flex-1 gap-4"
    >
      <Head title="Products" />
      <InvoiceProvider
        recentInvoice={recentInvoiceData.data}
        invoiceItems={invoiceProductData.data}
        serverMessage={serverMessage as string}
        allUserInvoicesData={allUserInvoicesData.data}
      >
        <ProductProvider products={productData.data}>
          <InvoiceHistory />
          <InvoiceProductDisplay />
          <InvoicePreview />
        </ProductProvider>
      </InvoiceProvider>
    </Authenticated>
  );
}
