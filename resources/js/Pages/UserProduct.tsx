import InvoicePreview from "@/Components/invoice/InvoicePreview";
import InvoiceProductDisplay from "@/Components/invoice/InvoiceProductDisplay";
import { InvoiceProvider } from "@/Context/InvoiceContext";
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
}: PageProps) {
  const productData = products as TLaravelResource<TProduct[]>;
  const recentInvoiceData = recentInvoice as TLaravelResource<TInvoice>;
  const invoiceProductData = invoiceProducts as TLaravelResource<TProduct[]>;
  return (
    <Authenticated
      user={auth.user}
      className="grid grid-cols-[2fr_1fr] mt-4 flex-1 gap-4"
    >
      <InvoiceProvider
        recentInvoice={recentInvoiceData.data}
        invoiceItems={invoiceProductData.data}
      >
        <ProductProvider products={productData.data}>
          <Head title="Products" />
          <InvoiceProductDisplay />
          <InvoicePreview />
        </ProductProvider>
      </InvoiceProvider>
    </Authenticated>
  );
}
