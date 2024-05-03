import ProductDisplay from "@/Components/product/ProductDisplay";
import ProductForm from "@/Components/product/ProductForm";
import PopupProvider, { usePopup } from "@/Context/PopupContext";
import { ProductProvider } from "@/Context/ProductContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TLaravelResource } from "@/Utils/types";
import { PageProps, TProduct } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Inertia from "@inertiajs/react";

// Inertia passes data as props.
export default function Product({ auth, products, serverMessage }: PageProps) {
  const productData = products as TLaravelResource<TProduct[]>;

  return (
    <Authenticated
      user={auth.user}
      className="grid grid-cols-[5fr_4fr] mt-4 flex-1 gap-4"
    >
      <Head title="Products" />
      <ProductProvider
        products={productData.data}
        serverMessage={serverMessage as string}
      >
        <ProductDisplay />
        <ProductForm />
      </ProductProvider>
    </Authenticated>
  );
}
