import InvoiceList from "./InvoiceList";

export default function InvoicePreview() {
  return (
    <article className="grid grid-rows-[auto_1fr]">
      <div>
        <h2>Invoiced Items</h2>
        <p>An invoice will be created for the following items you have added</p>
      </div>
      <InvoiceList />
    </article>
  );
}
