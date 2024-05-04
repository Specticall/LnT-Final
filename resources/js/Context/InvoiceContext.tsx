import { TInvoice } from "@/Utils/types";
import { TProduct } from "@/types";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { usePopup } from "./PopupContext";

type TInvoiceContextValues = {
  recentInvoice: TInvoice;
  invoiceItems: TProduct[];
  serverMessage?: string;
  allUserInvoicesData: TInvoice[];
};

const InvoiceContext = createContext<TInvoiceContextValues | null>(null);

export function InvoiceProvider({
  children,
  recentInvoice,
  invoiceItems,
  serverMessage,
  allUserInvoicesData,
}: {
  children: ReactNode;
  recentInvoice?: TInvoice;
  invoiceItems?: TProduct[];
  serverMessage?: string;
  allUserInvoicesData?: TInvoice[];
}) {
  const { notify } = usePopup();

  useEffect(() => {
    if (!serverMessage) return;
    notify(serverMessage);
  }, [serverMessage]);

  return (
    <InvoiceContext.Provider
      value={{ recentInvoice, invoiceItems, allUserInvoicesData }}
    >
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
