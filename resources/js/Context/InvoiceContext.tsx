import { TInvoice } from "@/Utils/types";
import { ReactNode, createContext, useContext } from "react";

type TInvoiceContextValues = {
  recentInvoice: TInvoice[];
};

const InvoiceContext = createContext<TInvoiceContextValues | null>(null);

export function InvoiceProvider({
  children,
  recentInvoice,
}: {
  children: ReactNode;
  recentInvoice: TInvoice[];
}) {
  return (
    <InvoiceContext.Provider value={{ recentInvoice }}>
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
