import InvoiceHeader from "./InvoiceHeader";
import InvoiceItems from "./InvoiceItems";

export default function InvoiceDetails() {
  return (
    <article className="flex flex-col gap-4">
      <InvoiceHeader />
      <InvoiceItems />
    </article>
  );
}
