import InvoicePreview from "@/Components/invoice/InvoicePreview";
import ProductDisplay from "@/Components/product/ProductDisplay";
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
  const recentInvoiceData = recentInvoice as TLaravelResource<TInvoice[]>;
  console.log(invoiceProducts);
  return (
    <Authenticated
      user={auth.user}
      className="grid grid-cols-[5fr_4fr] mt-4 flex-1 gap-4"
    >
      <InvoiceProvider recentInvoice={recentInvoiceData.data}>
        <ProductProvider products={productData.data}>
          <Head title="Products" />
          <ProductDisplay />
          <InvoicePreview />
        </ProductProvider>
      </InvoiceProvider>
    </Authenticated>
  );
}
