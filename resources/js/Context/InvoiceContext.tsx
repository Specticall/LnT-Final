import { TInvoice } from "@/Utils/types";
import { TProduct } from "@/types";
import { ReactNode, createContext, useContext } from "react";

type TInvoiceContextValues = {
  recentInvoice: TInvoice;
  invoiceItems: TProduct[];
};

const InvoiceContext = createContext<TInvoiceContextValues | null>(null);

export function InvoiceProvider({
  children,
  recentInvoice,
  invoiceItems,
}: {
  children: ReactNode;
  recentInvoice: TInvoice;
  invoiceItems: TProduct[];
}) {
  return (
    <InvoiceContext.Provider value={{ recentInvoice, invoiceItems }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context)
    throw new Error("useInvoice must be used inside of it's Provider's scope");
  return context;
}
