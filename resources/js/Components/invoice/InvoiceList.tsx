import { useInvoice } from "@/Context/InvoiceContext";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function InvoiceList() {
  const { recentInvoice } = useInvoice();
  return (
    <ScrollArea>
      {/* <ul>{recentInvoice.map((invoice) => {})}</ul> */}
    </ScrollArea>
  );
}
