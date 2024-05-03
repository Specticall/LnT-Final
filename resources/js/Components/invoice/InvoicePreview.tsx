import InvoiceList from "./InvoiceList";

export default function InvoicePreview() {
  return (
    <article className="grid grid-rows-[auto_1fr_auto] bg-white rounded-xl">
      <div className="p-6 border-bg border-b-[1px]">
        <h2 className="text-xl text-dark font-semibold">Invoice</h2>
        <p className="text-sm text-light mt-1">
          An invoice will be created for the following items you have added
        </p>
      </div>
      <InvoiceList />
    </article>
  );
}
